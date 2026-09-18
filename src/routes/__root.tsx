import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { PortfolioProvider } from "../context/PortfolioContext";
import { getTransactions } from "../actions/transactions";
import { getPrices } from "../actions/prices";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-red-500 font-mono text-left bg-accent p-2 rounded">
          {error.message}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Portfolio Tracker" },
      {
        name: "description",
        content: "Portfolio tracker.",
      },
      { name: "author", content: "Portfolio Tracker" },
      { property: "og:title", content: "Portfolio Tracker" },
      {
        property: "og:description",
        content: "Portfolio tracker.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📈</text></svg>" },
    ],
  }),
  loader: async () => {
    const res = await getTransactions();
    if (res.error) {
      throw new Error(res.error);
    }
    const transactions = res.data || [];
    
    // Only fetch prices for active holdings to avoid rate limits
    const holdings: Record<string, number> = {};
    transactions.forEach(tx => {
      if (tx.symbol !== 'GEF Cash' && tx.symbol !== 'Cash') {
        if (tx.type === 'BUY') {
          holdings[tx.symbol] = (holdings[tx.symbol] || 0) + tx.shares;
        } else if (tx.type === 'SELL') {
          holdings[tx.symbol] = (holdings[tx.symbol] || 0) - tx.shares;
        }
      }
    });
    
    const activeSymbols = Object.entries(holdings)
      .filter(([_, shares]) => shares > 0.000001)
      .map(([sym]) => sym);
      
    const symbols = Array.from(new Set(activeSymbols));
    if (!symbols.includes('URTH')) symbols.push('URTH');
    
    let initialPrices = {};
    if (symbols.length > 0) {
      const priceRes = await getPrices({ data: { symbols } });
      if (priceRes.data) {
        initialPrices = priceRes.data;
      }
    }
    
    return { initialTransactions: transactions, initialPrices };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { initialTransactions, initialPrices } = Route.useLoaderData();

  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioProvider initialTransactions={initialTransactions} initialPrices={initialPrices}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </PortfolioProvider>
    </QueryClientProvider>
  );
}
