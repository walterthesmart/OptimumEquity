import { n as createServerFn } from "./ssr.mjs";
import { n as prisma, t as createServerRpc } from "./prisma-PkHBFGjN.mjs";
import { t as YahooFinance } from "../_libs/yahoo-finance2.mjs";
import { a as stringType, i as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prices-BBgojZWU.js
async function fetchQuoteWithFallback(symbol) {
	let lastError;
	try {
		const cached = await prisma.customPrice.findUnique({ where: { symbol } });
		if (cached) {
			if ((/* @__PURE__ */ new Date()).getTime() - cached.updatedAt.getTime() < 9e5) return {
				price: cached.price,
				previousClose: cached.price,
				currency: "USD",
				longName: symbol
			};
		}
	} catch (e) {
		console.error(`Error reading CustomPrice for ${symbol}:`, e);
	}
	let fetchedPrice = null;
	try {
		const quote = await YahooFinance.quote(symbol);
		if (!quote) throw new Error(`Yahoo Finance returned undefined quote for ${symbol}`);
		fetchedPrice = quote.regularMarketPrice;
		if (fetchedPrice) prisma.customPrice.upsert({
			where: { symbol },
			update: { price: fetchedPrice },
			create: {
				symbol,
				price: fetchedPrice
			}
		}).catch((e) => console.error("Failed to cache price:", e));
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
		if (json["Global Quote"]) {
			fetchedPrice = parseFloat(json["Global Quote"]["05. price"]);
			if (fetchedPrice) {
				prisma.customPrice.upsert({
					where: { symbol },
					update: { price: fetchedPrice },
					create: {
						symbol,
						price: fetchedPrice
					}
				}).catch((e) => {});
				return {
					price: fetchedPrice,
					currency: "USD"
				};
			}
		}
	} catch (e) {
		lastError = e;
	}
	if (process.env.FINNHUB_API_KEY) try {
		const json = await (await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`)).json();
		if (json.c) {
			fetchedPrice = json.c;
			if (fetchedPrice) {
				prisma.customPrice.upsert({
					where: { symbol },
					update: { price: fetchedPrice },
					create: {
						symbol,
						price: fetchedPrice
					}
				}).catch((e) => {});
				return {
					price: fetchedPrice,
					currency: "USD"
				};
			}
		}
	} catch (e) {
		lastError = e;
	}
	try {
		const cached = await prisma.customPrice.findUnique({ where: { symbol } });
		if (cached) {
			console.warn(`APIs failed, using stale cached price for ${symbol}`);
			return {
				price: cached.price,
				previousClose: cached.price,
				currency: "USD",
				longName: symbol
			};
		}
	} catch (e) {}
	throw lastError || /* @__PURE__ */ new Error("All providers failed and no cached data available");
}
async function fetchHistoricalWithFallback(symbol, startDate) {
	let fetchedData = [];
	try {
		const histData = await YahooFinance.historical(symbol, {
			period1: startDate,
			period2: /* @__PURE__ */ new Date(),
			interval: "1d"
		});
		if (!histData) throw new Error(`Yahoo Finance returned undefined historical data for ${symbol}`);
		fetchedData = histData.map((d) => ({
			date: d.date.toISOString().split("T")[0],
			close: d.close
		}));
	} catch (e) {
		if (process.env.ALPHAVANTAGE_API_KEY) try {
			const series = (await (await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)).json())["Time Series (Daily)"];
			if (series) {
				for (const [date, values] of Object.entries(series)) if (date >= startDate) fetchedData.push({
					date,
					close: parseFloat(values["4. close"])
				});
				fetchedData.sort((a, b) => a.date.localeCompare(b.date));
			}
		} catch (e) {}
	}
	if (fetchedData.length > 0) {
		try {
			Promise.all(fetchedData.map((d) => prisma.historicalPrice.upsert({
				where: { symbol_date: {
					symbol,
					date: d.date
				} },
				update: { close: d.close },
				create: {
					symbol,
					date: d.date,
					close: d.close
				}
			}))).catch((e) => console.error(`Failed to cache historical data for ${symbol}:`, e));
		} catch (e) {}
		return fetchedData;
	}
	try {
		const cachedHistory = await prisma.historicalPrice.findMany({
			where: {
				symbol,
				date: { gte: startDate }
			},
			orderBy: { date: "asc" }
		});
		if (cachedHistory.length > 0) {
			console.warn(`APIs failed, using cached historical data for ${symbol}`);
			return cachedHistory.map((h) => ({
				date: h.date,
				close: h.close
			}));
		}
	} catch (e) {
		console.error(`Error reading HistoricalPrice for ${symbol}:`, e);
	}
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
