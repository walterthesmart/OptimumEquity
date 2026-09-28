const yahooFinance = require('yahoo-finance2').default;

async function main() {
  try {
    const data = await yahooFinance.historical('AAPL', { period1: '2026-08-01', period2: new Date(), interval: '1d' });
    console.log(data.length, "rows fetched");
    if (data.length > 0) {
      console.log("Last date:", data[data.length - 1].date);
    }
  } catch (e) {
    console.error(e);
  }
}
main();
