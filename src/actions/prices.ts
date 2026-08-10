import { createServerFn } from "@tanstack/react-start";
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();
import { z } from "zod";

async function fetchQuoteWithFallback(symbol: string) {
  let lastError;
  try { 
    const quote = await yahooFinance.quote(symbol); 
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
         return { price: parseFloat(json['Global Quote']['05. price']), currency: 'USD' };
       }
     } catch(e) { lastError = e; }
  }

  if (process.env.FINNHUB_API_KEY) {
     try {
       const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
       const json = await res.json();
       if (json.c) {
         return { price: json.c, currency: 'USD' };
       }
     } catch(e) { lastError = e; }
  }

  throw lastError || new Error('All providers failed');
}

async function fetchHistoricalWithFallback(symbol: string, startDate: string) {
  let lastError;
  try {
     const histData = await yahooFinance.historical(symbol, { period1: startDate, period2: new Date(), interval: '1d' });
     return histData.map((d: any) => ({
       date: d.date.toISOString().split('T')[0],
       close: d.close,
     }));
  } catch(e) { lastError = e; }

  if (process.env.ALPHAVANTAGE_API_KEY) {
    try {
      const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.ALPHAVANTAGE_API_KEY}`);
      const json = await res.json();
      const series = json['Time Series (Daily)'];
      if (series) {
        const hist = [];
        for (const [date, values] of Object.entries(series)) {
          if (date >= startDate) {
            hist.push({ date, close: parseFloat((values as any)['4. close']) });
          }
        }
        return hist.sort((a, b) => a.date.localeCompare(b.date));
      }
    } catch(e) { lastError = e; }
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
