import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();
async function test() {
  try {
    const hist = await yahooFinance.historical('IDEV', { period1: '2026-07-20', period2: new Date(), interval: '1d' });
    console.log('Hist length:', hist.length);
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
