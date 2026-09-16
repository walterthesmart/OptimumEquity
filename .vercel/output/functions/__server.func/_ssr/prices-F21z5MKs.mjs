import { r as createServerFn } from "./server-DiRP4YEU.mjs";
import { t as createServerRpc } from "./createServerRpc-B1r-8S0j.mjs";
import { t as YahooFinance } from "../_libs/yahoo-finance2.mjs";
import { a as stringType, i as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prices-F21z5MKs.js
async function fetchQuoteWithFallback(symbol) {
	let lastError;
	try {
		const quote = await YahooFinance.quote(symbol);
		if (!quote) throw new Error(`Yahoo Finance returned undefined quote for ${symbol}`);
		return {
			price: quote.regularMarketPrice,
			previousClose: quote.regularMarketPreviousClose,
			currency: quote.currency,
			longName: quote.longName
		};
	} catch (e) {
		lastError = e;
	}
	if (process.env.ALPHAVANTAGE_API_KEY) try {
		const json = await (await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)).json();
		if (json["Global Quote"]) return {
			price: parseFloat(json["Global Quote"]["05. price"]),
			currency: "USD"
		};
	} catch (e) {
		lastError = e;
	}
	if (process.env.FINNHUB_API_KEY) try {
		const json = await (await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`)).json();
		if (json.c) return {
			price: json.c,
			currency: "USD"
		};
	} catch (e) {
		lastError = e;
	}
	throw lastError || /* @__PURE__ */ new Error("All providers failed");
}
async function fetchHistoricalWithFallback(symbol, startDate) {
	try {
		const histData = await YahooFinance.historical(symbol, {
			period1: startDate,
			period2: /* @__PURE__ */ new Date(),
			interval: "1d"
		});
		if (!histData) throw new Error(`Yahoo Finance returned undefined historical data for ${symbol}`);
		return histData.map((d) => ({
			date: d.date.toISOString().split("T")[0],
			close: d.close
		}));
	} catch (e) {}
	if (process.env.ALPHAVANTAGE_API_KEY) try {
		const series = (await (await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)).json())["Time Series (Daily)"];
		if (series) {
			const hist = [];
			for (const [date, values] of Object.entries(series)) if (date >= startDate) hist.push({
				date,
				close: parseFloat(values["4. close"])
			});
			return hist.sort((a, b) => a.date.localeCompare(b.date));
		}
	} catch (e) {}
	return [];
}
var pricesSchema = objectType({
	symbols: arrayType(stringType()).min(1),
	startDate: stringType().optional()
});
var getPrices_createServerFn_handler = createServerRpc({
	id: "151d5f887164f12a5104ed755372be3d1cff2bc07054f741c838712a4145d455",
	name: "getPrices",
	filename: "src/actions/prices.ts"
}, (opts) => getPrices.__executeServer(opts));
var getPrices = createServerFn({ method: "POST" }).validator(pricesSchema).handler(getPrices_createServerFn_handler, async ({ data: { symbols, startDate } }) => {
	try {
		const uniqueSymbols = Array.from(new Set(symbols));
		const results = {};
		const fetchPromises = uniqueSymbols.map(async (symbol) => {
			try {
				const quote = await fetchQuoteWithFallback(symbol);
				let historical = [];
				if (startDate) historical = await fetchHistoricalWithFallback(symbol, startDate);
				return {
					symbol,
					success: true,
					data: {
						...quote,
						historical
					}
				};
			} catch (err) {
				console.error(`Failed to fetch quote for ${symbol}:`, err);
				return {
					symbol,
					success: false,
					data: null
				};
			}
		});
		(await Promise.all(fetchPromises)).forEach((res) => {
			if (res.success) results[res.symbol] = res.data;
			else results[res.symbol] = null;
		});
		return { data: results };
	} catch (error) {
		console.error("API /prices error:", error);
		return { error: "Failed to fetch prices" };
	}
});
//#endregion
export { getPrices_createServerFn_handler };
