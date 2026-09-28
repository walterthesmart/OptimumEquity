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
      
      const excludedStocks = ['ET', 'EPD', 'PEP', 'PG', 'ABBV', 'DOC', 'O', 'VZ', 'BAC', 'CMI', 'URTH'];
      const allSymbols = [...new Set(txs.map(t => t.symbol))];
      const symbols = allSymbols.filter(s => s !== 'GEF Cash' && !s.includes(' ') && !excludedStocks.includes(s));
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      let updated = 0;
      for (const symbol of symbols) {
        try {
          const histData = await Promise.race([
            yahooFinance.historical(symbol, { period1: sevenDaysAgo.toISOString().split('T')[0], period2: new Date(), interval: '1d' }),
            timeout(4000)
          ]) as any[];
          
          if (histData && histData.length > 0) {
            const dataToInsert = histData.map(d => ({
              symbol,
              date: d.date.toISOString().split('T')[0],
              close: d.close
            }));
            await prisma.historicalPrice.createMany({
              data: dataToInsert,
              skipDuplicates: true
            });
          }
          
          const quote = await Promise.race([
            yahooFinance.quote(symbol),
            timeout(2000)
          ]) as any;

          if (quote && quote.regularMarketPrice) {
             await prisma.customPrice.upsert({
                where: { symbol },
                update: { price: quote.regularMarketPrice },
                create: { symbol, price: quote.regularMarketPrice }
             });
          }
          updated++;
          await delay(50);
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
