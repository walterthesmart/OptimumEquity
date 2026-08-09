import { YahooFinance } from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

async function test() {
  try {
    const quote = await yahooFinance.quote('IDEV');
    console.log('Quote:', quote.regularMarketPrice);
    const hist = await yahooFinance.historical('IDEV', { period1: '2026-07-20', period2: new Date(), interval: '1d' });
    console.log('Hist:', hist.length);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
