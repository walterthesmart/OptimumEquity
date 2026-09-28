import { createAPIFileRoute } from '@tanstack/react-start/api';
import { prisma } from '@/lib/prisma';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance({ suppressNotices: ['ripHistorical'] });
const timeout = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const APIRoute = createAPIFileRoute('/api/cron')({
  GET: async ({ request }) => {
    // Basic auth check if CRON_SECRET is set
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const txs = await prisma.transaction.findMany({
        select: { symbol: true }
      });
      
      const allSymbols = [...new Set(txs.map(t => t.symbol))];
      const symbols = allSymbols.filter(s => s !== 'GEF Cash' && !s.includes(' '));
      
      let updated = 0;
      for (const symbol of symbols) {
        try {
          const histData = await Promise.race([
            yahooFinance.historical(symbol, { period1: '2026-07-20', period2: new Date(), interval: '1d' }),
            timeout(8000)
          ]) as any[];
          
          if (histData && histData.length > 0) {
              const latestDateStr = histData[histData.length - 1].date.toISOString().split('T')[0];
              const latestClose = histData[histData.length - 1].close;
              await prisma.historicalPrice.upsert({
                where: { symbol_date: { symbol, date: latestDateStr } },
                update: { close: latestClose },
                create: { symbol, date: latestDateStr, close: latestClose }
              });
          }
          
          const quote = await Promise.race([
            yahooFinance.quote(symbol),
            timeout(4000)
          ]) as any;

          if (quote && quote.regularMarketPrice) {
             await prisma.customPrice.upsert({
                where: { symbol },
                update: { price: quote.regularMarketPrice },
                create: { symbol, price: quote.regularMarketPrice }
             });
          }
          updated++;
          await delay(200); // Prevent rate-limit
        } catch (e: any) {
          console.error(`Failed to fetch/update ${symbol}:`, e.message);
        }
      }
      return new Response(`Cron successful, updated ${updated} symbols`, { status: 200 });
    } catch (e: any) {
      return new Response('Cron failed: ' + e.message, { status: 500 });
    }
  },
});
