import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as getServerFnById, n as __exportAll, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-DiRP4YEU.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BZ5kNVE7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-EbU4GzQh.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var pricesSchema = objectType({
	symbols: arrayType(stringType()).min(1),
	startDate: stringType().optional()
});
var getPrices = createServerFn({ method: "POST" }).validator(pricesSchema).handler(createSsrRpc("151d5f887164f12a5104ed755372be3d1cff2bc07054f741c838712a4145d455"));
var transactionSchema = objectType({
	id: stringType().optional(),
	symbol: stringType().min(1),
	date: stringType(),
	type: enumType([
		"BUY",
		"SELL",
		"TXIN",
		"TXOUT"
	]),
	price: numberType().nonnegative(),
	shares: numberType().nonnegative(),
	fees: numberType().nonnegative().default(0),
	assetClass: stringType().default("Stock")
});
var bulkTransactionSchema = arrayType(transactionSchema);
var getTransactions = createServerFn({ method: "GET" }).handler(createSsrRpc("c392bddaba2f7d944f5d30dca9b4ec590a291ca19ae312efbd9237e7cbb2ede2"));
var addTransaction = createServerFn({ method: "POST" }).validator(transactionSchema).handler(createSsrRpc("691cf5e7844d155df9f44c3e710a9bb532b1c83e5767a25446aa607266c8e177"));
var addBulkTransactions = createServerFn({ method: "POST" }).validator(bulkTransactionSchema).handler(createSsrRpc("f3ccd206433bf9600d92ad0584bf98b65bba2c8e7c41f6e350d0bf5d930fee26"));
var removeTransaction = createServerFn({ method: "POST" }).validator(objectType({ id: stringType() })).handler(createSsrRpc("ab5b10726cc79cbc44a1f3cb98037f59781102c40b6c9d9f4dbf35296bf368af"));
var clearAllTransactions = createServerFn({ method: "POST" }).handler(createSsrRpc("9a966739e901e4ddb39b77c07b5763a8785427097d9806c3810977a2d5e8439f"));
var PortfolioContext = (0, import_react.createContext)(void 0);
function PortfolioProvider({ children }) {
	const [transactions, setTransactions] = (0, import_react.useState)([]);
	const [fetchedPrices, setFetchedPrices] = (0, import_react.useState)({});
	const [customPrices, setCustomPrices] = (0, import_react.useState)({});
	const [isLoadingPrices, setIsLoadingPrices] = (0, import_react.useState)(false);
	const [isInitialized, setIsInitialized] = (0, import_react.useState)(false);
	const [excludedSymbols, setExcludedSymbols] = (0, import_react.useState)([]);
	const [startDate, setStartDate] = (0, import_react.useState)(null);
	const [endDate, setEndDate] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const savedCustomPrices = localStorage.getItem("portfolio_custom_prices");
		if (savedCustomPrices) try {
			setCustomPrices(JSON.parse(savedCustomPrices));
		} catch (e) {
			console.error("Failed to parse saved custom prices");
		}
		console.log("Fetching transactions from DB...");
		getTransactions().then((res) => {
			console.log("DB response in frontend:", res);
			if (res.data) setTransactions(res.data);
		}).catch((e) => console.error("Failed to load initial transactions", e));
		setIsInitialized(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (isInitialized) localStorage.setItem("portfolio_custom_prices", JSON.stringify(customPrices));
	}, [customPrices, isInitialized]);
	const refreshPrices = (0, import_react.useCallback)(async () => {
		const symbols = Array.from(new Set(transactions.map((t) => t.symbol))).filter((s) => s !== "GEF Cash" && s !== "Cash");
		if (!symbols.includes("URTH")) symbols.push("URTH");
		if (symbols.length === 0) return;
		setIsLoadingPrices(true);
		let earliestDate;
		if (transactions.length > 0) earliestDate = transactions.reduce((earliestTx, currentTx) => {
			return new Date(currentTx.date) < new Date(earliestTx.date) ? currentTx : earliestTx;
		}).date;
		try {
			const res = await getPrices({ data: {
				symbols,
				startDate: earliestDate
			} });
			if (res.data) setFetchedPrices(res.data);
		} catch (e) {
			console.error("Error fetching prices:", e);
		} finally {
			setIsLoadingPrices(false);
		}
	}, [transactions]);
	(0, import_react.useEffect)(() => {
		if (isInitialized && transactions.length > 0) refreshPrices();
	}, [
		transactions,
		isInitialized,
		refreshPrices
	]);
	const addTransaction$1 = async (tx) => {
		try {
			const res = await addTransaction({ data: tx });
			if (res.data) setTransactions((prev) => [...prev, res.data]);
			else console.error(res.error);
		} catch (e) {
			console.error(e);
		}
	};
	const importTransactions = async (txs) => {
		try {
			if ((await addBulkTransactions({ data: txs })).data) {
				const fresh = await getTransactions();
				if (fresh.data) setTransactions(fresh.data);
			}
		} catch (e) {
			console.error(e);
		}
	};
	const deleteTransaction = async (id) => {
		try {
			if ((await removeTransaction({ data: { id } })).success) setTransactions((prev) => prev.filter((tx) => tx.id !== id));
		} catch (e) {
			console.error(e);
		}
	};
	const clearTransactions = async () => {
		try {
			if ((await clearAllTransactions()).success) setTransactions([]);
		} catch (e) {
			console.error(e);
		}
	};
	const updateCustomPrice = (symbol, price) => {
		setCustomPrices((prev) => {
			const next = { ...prev };
			if (price === null) delete next[symbol];
			else next[symbol] = price;
			return next;
		});
	};
	const livePrices = (0, import_react.useMemo)(() => {
		const merged = { ...fetchedPrices };
		Object.keys(customPrices).forEach((sym) => {
			if (!merged[sym] || merged[sym] === null) merged[sym] = {
				price: customPrices[sym],
				previousClose: 0,
				currency: "USD",
				longName: sym,
				historical: []
			};
			else merged[sym] = {
				...merged[sym],
				price: customPrices[sym]
			};
		});
		return merged;
	}, [fetchedPrices, customPrices]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioContext.Provider, {
		value: {
			transactions,
			addTransaction: addTransaction$1,
			importTransactions,
			deleteTransaction,
			clearTransactions,
			livePrices,
			isLoadingPrices,
			refreshPrices,
			customPrices,
			updateCustomPrice,
			excludedSymbols,
			setExcludedSymbols,
			startDate,
			setStartDate,
			endDate,
			setEndDate
		},
		children
	});
}
function usePortfolio() {
	const context = (0, import_react.useContext)(PortfolioContext);
	if (context === void 0) throw new Error("usePortfolio must be used within a PortfolioProvider");
	return context;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Portfolio Tracker" },
			{
				name: "description",
				content: "Portfolio tracker."
			},
			{
				name: "author",
				content: "Portfolio Tracker"
			},
			{
				property: "og:title",
				content: "Portfolio Tracker"
			},
			{
				property: "og:description",
				content: "Portfolio tracker."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📈</text></svg>"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter = () => import("./routes-CjOuckX0.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Portfolio Tracker" },
		{
			name: "description",
			content: "Portfolio Tracker"
		},
		{
			property: "og:title",
			content: "Portfolio Tracker"
		},
		{
			property: "og:description",
			content: "Portfolio Tracker"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { usePortfolio as n, router_exports as t };
