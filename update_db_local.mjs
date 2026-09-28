import { PrismaClient } from '@prisma/client';
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance({ suppressNotices: ['ripHistorical'] });

const prisma = new PrismaClient();

const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log('Fetching symbols from database...');
  const txs = await prisma.transaction.findMany({
    select: { symbol: true }
  });
  
  // Filter out any cash positions or invalid symbols
  const allSymbols = [...new Set(txs.map(t => t.symbol))];
  const symbols = allSymbols.filter(s => s !== 'GEF Cash' && !s.includes(' '));
  
  console.log(`Found ${symbols.length} valid symbols to update.`);
  console.log('Starting update...');
  for (const symbol of symbols) {
    console.log(`Fetching historical data for ${symbol}...`);
    try {
      const histData = await Promise.race([
        yahooFinance.historical(symbol, { period1: '2026-07-20', period2: new Date(), interval: '1d' }),
        timeout(10000)
      ]);
      
      for (const d of histData) {
        const dateStr = d.date.toISOString().split('T')[0];
        await prisma.historicalPrice.upsert({
          where: { symbol_date: { symbol, date: dateStr } },
          update: { close: d.close },
          create: { symbol, date: dateStr, close: d.close }
        });
      }
      
      const quote = await Promise.race([
        yahooFinance.quote(symbol),
        timeout(5000)
      ]);
      if (quote && quote.regularMarketPrice) {
         await prisma.customPrice.upsert({
            where: { symbol },
            update: { price: quote.regularMarketPrice },
            create: { symbol, price: quote.regularMarketPrice }
         });
      }
      
      console.log(`Updated ${symbol}`);
      await delay(500); // Prevent rate-limit/hanging
    } catch (e) {
      console.error(`Failed to fetch/update ${symbol}:`, e.message);
    }
  }
  console.log('Done!');
}
main().catch(console.error).finally(() => prisma.$disconnect());
