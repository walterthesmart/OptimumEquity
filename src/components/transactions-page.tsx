import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { StockDetailSheet } from "./stock-detail-sheet";
import { calculateAdvancedMetrics } from "@/lib/calculations";
import type { PortfolioPosition } from "@/types";

export function TransactionsPage({ positions }: { positions: PortfolioPosition[] }) {
  const { transactions, livePrices, startDate } = usePortfolio();
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const sortedTransactions = React.useMemo(() => {
    return [...transactions].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);

  const positionMetrics = React.useMemo(() => {
    const res: Record<string, { twr: number, mwr: number }> = {};
    if (!transactions || !livePrices) return res;

    for (const pos of positions) {
      if (pos.assetClass === 'Cash') continue;
      const stockTxs = transactions.filter(t => t.symbol === pos.symbol);
      const adv = calculateAdvancedMetrics(stockTxs, livePrices, pos.currentValue, startDate, true);
      res[pos.symbol] = adv;
    }
    return res;
  }, [positions, transactions, livePrices, startDate]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-mint">
          Transactions History
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your complete portfolio transaction history from inception. Click on any equity to view its performance.
        </p>
      </header>
      
      <section className="surface p-4 sm:p-5">
        <div className="divide-y divide-border/60">
           {sortedTransactions.length === 0 && (
             <p className="text-sm text-muted-foreground py-8 text-center">No transactions found.</p>
           )}
           {sortedTransactions.map((tx) => (
             <div 
               key={tx.id} 
               onClick={() => tx.assetClass !== 'Cash' && setSelectedSymbol(tx.symbol)}
               className={`flex items-center justify-between gap-3 py-4 ${tx.assetClass !== 'Cash' ? 'cursor-pointer hover:bg-accent/40 rounded-md px-2 -mx-2' : 'px-2 -mx-2'}`}
             >
               <div>
                 <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">{tx.symbol}</span>
                    <span className="text-[11px] text-muted-foreground truncate hidden sm:inline-block max-w-[150px]">{livePrices?.[tx.symbol]?.longName}</span>
                 </div>
                 <p className="text-xs text-muted-foreground mt-0.5">{tx.date}</p>
               </div>
               <div className="text-right flex items-center gap-3">
                 <div>
                    <span className={`label-xs rounded-sm px-2.5 py-1 ${
                       tx.type === "BUY" || tx.type === "TXIN" ? "bg-positive/15 text-positive" : "bg-negative/15 text-negative"
                    }`}>
                    {tx.type}
                    </span>
                    <p className="text-xs font-semibold mt-1.5">{tx.shares} @ ${tx.price.toFixed(2)}</p>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </section>

      <StockDetailSheet 
        selectedSymbol={selectedSymbol}
        setSelectedSymbol={setSelectedSymbol}
        transactions={transactions || []}
        livePrices={livePrices}
        positionMetrics={selectedSymbol ? positionMetrics[selectedSymbol] : undefined}
        totalReturn={selectedSymbol ? positions.find(p => p.symbol === selectedSymbol)?.totalReturn : undefined}
        returnPercentage={selectedSymbol ? positions.find(p => p.symbol === selectedSymbol)?.returnPercentage : undefined}
      />
    </div>
  );
}
