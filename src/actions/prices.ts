"use server";

import YahooFinance from 'yahoo-finance2';
import { z } from "zod";
import { prisma } from "@/lib/prisma";

let yahooFinance: any;
if (typeof YahooFinance === 'function') {
  yahooFinance = new (YahooFinance as any)();
} else if (YahooFinance && typeof (YahooFinance as any).default === 'function') {
  yahooFinance = new (YahooFinance as any).default();
} else {
  // If all else fails, use the default export directly as it was in v2
  yahooFinance = YahooFinance;
}
console.log('yahooFinance instantiated:', typeof yahooFinance.quote === 'function');

async function fetchQuoteWithFallback(symbol: string) {
  const cached = await prisma.customPrice.findUnique({ where: { symbol } });
  if (cached) {
    const ageMs = Date.now() - new Date(cached.updatedAt).getTime();
    if (ageMs < 1000 * 60 * 60) { // 1 hour cache
      return { price: cached.price, currency: 'USD', previousClose: cached.price, longName: symbol };
    }
  }

  let lastError;
  let result = null;

  try { 
    const quote = (await yahooFinance.quote(symbol)) as any; 
    if (!quote) throw new Error(`Yahoo Finance returned undefined quote for ${symbol}`);
    
    result = { 
      price: quote.regularMarketPrice, 
      previousClose: quote.regularMarketPreviousClose, 
      currency: quote.currency, 
      longName: quote.longName 
    }; 
  } catch(e) { lastError = e; }
  
  if (!result) {
    const avKey = process.env.ALPHAVANTAGE_API_KEY || process.env.ALPHA_VANTAGE_API_KEY;
    if (avKey) {
       try {
         const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${avKey}`);
         const json = await res.json();
         if (json['Global Quote'] && json['Global Quote']['05. price']) {
           result = { price: parseFloat(json['Global Quote']['05. price']), currency: 'USD' };
         }
       } catch(e) { lastError = e; }
    }
  }

  if (!result && process.env.FINNHUB_API_KEY) {
     try {
       const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
       const json = await res.json();
       if (json.c) {
         result = { price: json.c, currency: 'USD' };
       }
     } catch(e) { lastError = e; }
  }

  if (result) {
    try {
      await prisma.customPrice.upsert({
        where: { symbol },
        create: { symbol, price: result.price },
        update: { price: result.price }
      });
    } catch (dbErr) {
      console.error(`Failed to cache quote for ${symbol}:`, dbErr);
    }
    return result;
  }

  if (cached) {
    console.warn(`[API] All providers failed for ${symbol}, falling back to stale cache`);
    return { price: cached.price, currency: 'USD', previousClose: cached.price, longName: symbol };
  }

  throw lastError || new Error('All providers failed');
}

async function fetchHistoricalWithFallback(symbol: string, startDate: string) {
  const cachedHistory = await prisma.historicalPrice.findMany({
    where: { symbol, date: { gte: startDate } },
    orderBy: { date: 'asc' }
  });
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (cachedHistory.length > 0) {
    const latestRecord = cachedHistory[cachedHistory.length - 1];
    if (latestRecord.date >= yesterdayStr) {
      return cachedHistory.map(h => ({ date: h.date, close: h.close }));
    }
  }

  let lastError;
  let result: { date: string, close: number }[] | null = null;

  try {
     const histData = (await yahooFinance.historical(symbol, { period1: startDate, period2: new Date(), interval: '1d' })) as any;
     if (!histData) throw new Error(`Yahoo Finance returned undefined historical data for ${symbol}`);
     
     result = histData.map((d: any) => ({
       date: d.date.toISOString().split('T')[0],
       close: d.close,
     }));
  } catch(e) { lastError = e; }

  if (!result) {
    const avKey = process.env.ALPHAVANTAGE_API_KEY || process.env.ALPHA_VANTAGE_API_KEY;
    if (avKey) {
      try {
        const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${avKey}`);
        const json = await res.json();
        const series = json['Time Series (Daily)'];
        if (series) {
          const hist = [];
          for (const [date, values] of Object.entries(series)) {
            if (date >= startDate) {
              hist.push({ date, close: parseFloat((values as any)['4. close']) });
            }
          }
          result = hist.sort((a, b) => a.date.localeCompare(b.date));
        }
      } catch(e) { lastError = e; }
    }
  }
  
  if (result && result.length > 0) {
    try {
      await prisma.historicalPrice.createMany({
        data: result.map(h => ({ symbol, date: h.date, close: h.close })),
        skipDuplicates: true
      });
    } catch (dbErr) {
      console.error(`Failed to cache historical data for ${symbol}:`, dbErr);
    }
    return result;
  }

  if (cachedHistory.length > 0) {
    console.warn(`[API] All providers failed for historical ${symbol}, falling back to partial stale cache`);
    return cachedHistory.map(h => ({ date: h.date, close: h.close }));
  }

  return [];
}

const pricesSchema = z.object({
  symbols: z.array(z.string()).min(1),
  startDate: z.string().optional()
});

export async function getPrices(input: { symbols: string[], startDate?: string }) {
  try {
    const { symbols, startDate } = pricesSchema.parse(input);
    const uniqueSymbols = Array.from(new Set(symbols));
    const results: Record<string, any> = {};

    const fetchPromises = uniqueSymbols.map(async (symbol) => {
      try {
        const quote = await fetchQuoteWithFallback(symbol);
        
        let historical: any[] = [];
        if (startDate) {
          historical = await fetchHistoricalWithFallback(symbol, startDate);
        }

        return {
          symbol,
          success: true,
          data: {
            ...quote,
            historical,
          }
        };
      } catch (err) {
        console.warn(`[API] Failed to fetch quote for ${symbol}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        return { symbol, success: false, data: null };
      }
    });

    const settled = await Promise.all(fetchPromises);
    
    settled.forEach((res) => {
      if (res.success) {
        results[res.symbol] = res.data;
      } else {
        results[res.symbol] = null;
      }
    });

    return { data: results };
  } catch (error) {
    console.error('API /prices error:', error);
    return { error: 'Failed to fetch prices' };
  }
}
