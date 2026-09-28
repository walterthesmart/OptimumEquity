import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

async function main() {
  try {
    const data = await yahooFinance.historical('AAPL', { period1: '2026-08-01', period2: new Date(), interval: '1d' });
    console.log(data.length, "rows fetched");
  } catch (e) {
    console.error(e);
  }
}
main();
