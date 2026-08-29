import React, { useMemo } from "react";
import { PanelBlock, StatRow, DetailSheet } from "@/components/detail-sheet";
import { TransactionForm } from "./transaction-form";
import { CSVUploader } from "./csv-uploader";
import { usePortfolio } from "@/context/PortfolioContext";
import { format } from "date-fns";
import type { PortfolioPosition } from "@/types";
import { calculateAdvancedMetrics, calculateHistoricalNAV } from "@/lib/calculations";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { StockDetailSheet } from "./stock-detail-sheet";

export function NavChartPanel() {
  const { transactions, livePrices } = usePortfolio();

  const history = useMemo(() => {
    const raw = calculateHistoricalNAV(transactions, livePrices);
    // Convert msciTotalReturn to percentage (x100) so it matches Total Return format
    return raw.map(d => ({
      ...d,
      totalReturnPct: d.totalReturn * 100,
      msciTotalReturnPct: d.msciTotalReturn ? d.msciTotalReturn * 100 : 0
    }));
  }, [transactions, livePrices]);

  if (history.length === 0) {
    return <div className="text-center py-10 text-muted-foreground">No historical NAV data available.</div>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">NAV & MSCI World Performance</h3>
        <p className="text-sm text-muted-foreground">Tracking the total return from inception.</p>
      </div>
      
      <div className="h-[400px] w-full mt-6 bg-card border border-border/60 rounded-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={(val) => {
                const date = new Date(val);
                return `${date.toLocaleString('default', { month: 'short' })} '${date.getFullYear().toString().slice(2)}`;
              }}
              minTickGap={30}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} 
              tickFormatter={(val) => `${val}%`}
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '6px', fontSize: '12px' }}
              itemStyle={{ color: 'var(--foreground)' }}
              labelStyle={{ color: 'var(--muted-foreground)', marginBottom: '4px' }}
              formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name === 'totalReturnPct' ? 'Portfolio Return' : 'MSCI World Return']}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line type="monotone" name="Portfolio Return" dataKey="totalReturnPct" stroke="var(--primary)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" name="MSCI World Return" dataKey="msciTotalReturnPct" stroke="var(--chart-3)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-card border border-border/60 rounded-md p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Portfolio Return</p>
          <p className={`text-2xl font-semibold ${history[history.length - 1].totalReturnPct >= 0 ? 'text-positive' : 'text-negative'}`}>
            {history[history.length - 1].totalReturnPct >= 0 ? '+' : ''}{history[history.length - 1].totalReturnPct.toFixed(2)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Since Inception</p>
        </div>
        <div className="bg-card border border-border/60 rounded-md p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">MSCI World</p>
          <p className={`text-2xl font-semibold ${history[history.length - 1].msciTotalReturnPct >= 0 ? 'text-positive' : 'text-negative'}`}>
            {history[history.length - 1].msciTotalReturnPct >= 0 ? '+' : ''}{history[history.length - 1].msciTotalReturnPct.toFixed(2)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Since Inception</p>
        </div>
      </div>
    </section>
  );
}

export function TransactionPanel() {
  const { transactions, deleteTransaction, clearTransactions } = usePortfolio();

  return (
    <div className="space-y-6">
      <PanelBlock title="Add New Transaction">
         <TransactionForm />
      </PanelBlock>

      <PanelBlock title="Bulk Import (CSV)">
         <CSVUploader />
      </PanelBlock>

      <PanelBlock title="Recent Transactions">
         <div className="flex justify-end mb-2">
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all transactions?')) {
                  clearTransactions();
                }
              }} 
              className="text-xs text-negative hover:text-negative/80 px-2 py-1 bg-negative/10 rounded-sm"
            >
              Clear All Transactions
            </button>
         </div>
         <div className="divide-y divide-border/60 max-h-96 overflow-y-auto pr-3">
           {transactions.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No transactions found.</p>}
           {transactions.slice().reverse().slice(0, 50).map((tx) => (
             <div key={tx.id} className="flex items-center justify-between gap-3 py-3">
               <div>
                 <span className="text-sm font-medium">{tx.symbol}</span>
                 <p className="text-xs text-muted-foreground">{tx.date}</p>
               </div>
               <div className="text-right flex items-center gap-3">
                 <div>
                    <span className={`label-xs rounded-sm px-2.5 py-1 ${
                       tx.type === "BUY" || tx.type === "TXIN" ? "bg-positive/15 text-positive" : "bg-negative/15 text-negative"
                    }`}>
                    {tx.type}
                    </span>
                    <p className="text-xs font-semibold mt-1">{tx.shares} @ ${tx.price.toFixed(2)}</p>
                 </div>
                 <button onClick={() => deleteTransaction(tx.id)} className="text-muted-foreground hover:text-negative text-xs ml-2 shrink-0">Del</button>
               </div>
             </div>
           ))}
         </div>
      </PanelBlock>
    </div>
  );
}

export function PositionsPanel({ 
  positions, 
  metrics,
  transactions,
  livePrices,
  startDate
}: { 
  positions: PortfolioPosition[], 
  metrics: any,
  transactions?: any[],
  livePrices?: any,
  startDate?: string | null
}) {
  const [selectedSymbol, setSelectedSymbol] = React.useState<string | null>(null);

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
     <section className="surface p-4 sm:p-5 mt-4">
       <h2 className={`text-base font-semibold text-mint`}>
         Portfolio Holdings
       </h2>
       <p className="mt-1 text-xs text-muted-foreground">
         Total Value:{" "}
         <span className="numeric font-semibold text-foreground">
           ${metrics.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
         </span>{" "}
         →{" "}
         <span
           className={`font-semibold ${
             metrics.returnPercentage >= 0
               ? "text-positive"
               : "text-negative"
           }`}
         >
           {metrics.returnPercentage >= 0 ? '+' : ''}{metrics.returnPercentage.toFixed(2)}%
         </span>
       </p>
       <div className="mt-6 space-y-3">
         {positions.map((pos) => {
           const adv = positionMetrics[pos.symbol];
           return (
             <div 
               key={pos.symbol} 
               onClick={() => pos.assetClass !== 'Cash' && setSelectedSymbol(pos.symbol)}
               className={`grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border/60 py-3 last:border-0 sm:grid-cols-[1.4fr_1.5fr_auto] ${pos.assetClass !== 'Cash' ? 'cursor-pointer hover:bg-accent/40 rounded-md px-2 -mx-2' : 'px-2 -mx-2'}`}
             >
               <div className="min-w-0">
                 <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">{pos.symbol}</span>
                    <span className="text-[11px] text-muted-foreground truncate hidden sm:inline-block max-w-[150px]">{livePrices?.[pos.symbol]?.longName}</span>
                 </div>
                 <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{pos.assetClass}</p>
                 <span className="numeric mt-1 inline-block rounded-sm bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                   {((pos.currentValue / metrics.totalValue) * 100).toFixed(1)}% wt
                 </span>
               </div>
               
               {/* Advanced Metrics Column */}
               <div className="hidden sm:block text-xs text-muted-foreground space-y-1">
                 {pos.assetClass !== 'Cash' && (
                   <>
                     <div className="flex justify-between max-w-[180px]">
                       <span>Invested Cash:</span>
                       <span className="font-semibold text-foreground">${pos.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                     </div>
                     {adv && (
                       <div className="flex justify-between max-w-[180px]">
                         <span>TWR / MWR:</span>
                         <span className="font-semibold text-foreground">{adv.twr.toFixed(1)}% / {adv.mwr.toFixed(1)}%</span>
                       </div>
                     )}
                   </>
                 )}
               </div>

               <div className="flex items-center justify-end gap-4">
                 <div className="text-right">
                    <div className="text-sm font-semibold">${pos.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-xs text-muted-foreground">{pos.shares} shs</div>
                 </div>
                 <span
                    className={`label-xs inline-flex w-[92px] shrink-0 items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 ${
                       pos.returnPercentage >= 0 ? "bg-positive/15 text-positive" : "bg-negative/15 text-negative"
                    }`}
                 >
                    {pos.returnPercentage >= 0 ? '+' : ''}{pos.returnPercentage.toFixed(2)}%
                 </span>
               </div>
             </div>
           );
         })}
       </div>

       <StockDetailSheet 
         selectedSymbol={selectedSymbol}
         setSelectedSymbol={setSelectedSymbol}
         transactions={transactions || []}
         livePrices={livePrices}
         positionMetrics={selectedSymbol ? positionMetrics[selectedSymbol] : undefined}
         totalReturn={selectedSymbol ? positions.find(p => p.symbol === selectedSymbol)?.totalReturn : undefined}
         returnPercentage={selectedSymbol ? positions.find(p => p.symbol === selectedSymbol)?.returnPercentage : undefined}
       />
     </section>
  )
}
