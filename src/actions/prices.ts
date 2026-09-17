import { createServerFn } from "@tanstack/react-start";
import yahooFinance from 'yahoo-finance2';
import { z } from "zod";
import { prisma } from "@/lib/prisma";

async function fetchQuoteWithFallback(symbol: string) {
  let lastError;
  
  // 1. Check if we have a fresh price in the DB (less than 15 mins old)
  try {
    const cached = await prisma.customPrice.findUnique({ where: { symbol } });
    if (cached) {
      const isFresh = new Date().getTime() - cached.updatedAt.getTime() < 15 * 60 * 1000;
      if (isFresh) {
        return { 
          price: cached.price, 
          previousClose: cached.price, // fallback
          currency: 'USD', 
          longName: symbol 
        };
      }
    }
  } catch(e) {
    console.error(`Error reading CustomPrice for ${symbol}:`, e);
  }

  // 2. Fetch from APIs
  let fetchedPrice = null;
  try { 
    const quote = await yahooFinance.quote(symbol); 
    if (!quote) throw new Error(`Yahoo Finance returned undefined quote for ${symbol}`);
    
    fetchedPrice = quote.regularMarketPrice;
    
    // Save to DB in background
    if (fetchedPrice) {
      prisma.customPrice.upsert({
        where: { symbol },
        update: { price: fetchedPrice },
        create: { symbol, price: fetchedPrice }
      }).catch(e => console.error("Failed to cache price:", e));
    }

    return { 
      price: quote.regularMarketPrice, 
      previousClose: quote.regularMarketPreviousClose, 
      currency: quote.currency, 
      longName: quote.longName 
    }; 
  } catch(e) { lastError = e; }
  
  if (process.env.ALPHAVANTAGE_API_KEY) {
     try {
       const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`);
       const json = await res.json();
       if (json['Global Quote']) {
         fetchedPrice = parseFloat(json['Global Quote']['05. price']);
         if (fetchedPrice) {
           prisma.customPrice.upsert({
             where: { symbol },
             update: { price: fetchedPrice },
             create: { symbol, price: fetchedPrice }
           }).catch(e => {});
           return { price: fetchedPrice, currency: 'USD' };
         }
       }
     } catch(e) { lastError = e; }
  }

  if (process.env.FINNHUB_API_KEY) {
     try {
       const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
       const json = await res.json();
       if (json.c) {
         fetchedPrice = json.c;
         if (fetchedPrice) {
           prisma.customPrice.upsert({
             where: { symbol },
             update: { price: fetchedPrice },
             create: { symbol, price: fetchedPrice }
           }).catch(e => {});
           return { price: fetchedPrice, currency: 'USD' };
         }
       }
     } catch(e) { lastError = e; }
  }

  // 3. Fallback to stale DB data if all APIs fail
  try {
    const cached = await prisma.customPrice.findUnique({ where: { symbol } });
    if (cached) {
      console.warn(`APIs failed, using stale cached price for ${symbol}`);
      return { 
        price: cached.price, 
        previousClose: cached.price,
        currency: 'USD', 
        longName: symbol 
      };
    }
  } catch(e) {}

  throw lastError || new Error('All providers failed and no cached data available');
}

async function fetchHistoricalWithFallback(symbol: string, startDate: string) {
  let lastError;
  let fetchedData: any[] = [];
  
  try {
     const histData = await yahooFinance.historical(symbol, { period1: startDate, period2: new Date(), interval: '1d' });
     if (!histData) throw new Error(`Yahoo Finance returned undefined historical data for ${symbol}`);
     
     fetchedData = histData.map((d: any) => ({
       date: d.date.toISOString().split('T')[0],
       close: d.close,
     }));
  } catch(e) { 
    lastError = e;
    
    // Try AlphaVantage if Yahoo fails
    if (process.env.ALPHAVANTAGE_API_KEY) {
      try {
        const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.ALPHAVANTAGE_API_KEY}`);
        const json = await res.json();
        const series = json['Time Series (Daily)'];
        if (series) {
          for (const [date, values] of Object.entries(series)) {
            if (date >= startDate) {
              fetchedData.push({ date, close: parseFloat((values as any)['4. close']) });
            }
          }
          fetchedData.sort((a, b) => a.date.localeCompare(b.date));
        }
      } catch(e) { lastError = e; }
    }
  }

  // If we fetched new data, save it to DB
  if (fetchedData.length > 0) {
    try {
      // Background cache update
      Promise.all(fetchedData.map(d => 
        prisma.historicalPrice.upsert({
          where: { symbol_date: { symbol, date: d.date } },
          update: { close: d.close },
          create: { symbol, date: d.date, close: d.close }
        })
      )).catch(e => console.error(`Failed to cache historical data for ${symbol}:`, e));
    } catch(e) {}
    
    return fetchedData;
  }

  // Fallback to database if fetching failed completely or rate limited
  try {
    const cachedHistory = await prisma.historicalPrice.findMany({
      where: { 
        symbol,
        date: { gte: startDate }
      },
      orderBy: { date: 'asc' }
    });
    
    if (cachedHistory.length > 0) {
      console.warn(`APIs failed, using cached historical data for ${symbol}`);
      return cachedHistory.map(h => ({ date: h.date, close: h.close }));
    }
  } catch(e) {
    console.error(`Error reading HistoricalPrice for ${symbol}:`, e);
  }
  
  return [];
}

const pricesSchema = z.object({
  symbols: z.array(z.string()).min(1),
  startDate: z.string().optional()
});

export const getPrices = createServerFn({ method: "POST" })
  .validator(pricesSchema)
  .handler(async ({ data: { symbols, startDate } }) => {
    try {
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
          console.error(`Failed to fetch quote for ${symbol}:`, err);
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
  });
