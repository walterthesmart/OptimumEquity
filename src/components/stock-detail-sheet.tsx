import React, { useState } from "react";
import { DetailSheet } from "@/components/detail-sheet";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StockDetailSheetProps {
  selectedSymbol: string | null;
  setSelectedSymbol: (symbol: string | null) => void;
  transactions: any[];
  livePrices: any;
  positionMetrics?: { twr: number; mwr: number };
  totalReturn?: number;
  returnPercentage?: number;
}

export function StockDetailSheet({
  selectedSymbol,
  setSelectedSymbol,
  transactions,
  livePrices,
  positionMetrics,
  totalReturn,
  returnPercentage
}: StockDetailSheetProps) {
  const { addTransaction } = usePortfolio();
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [sellShares, setSellShares] = useState<number | string>("");
  const [sellPrice, setSellPrice] = useState<number | string>("");

  const chartData = React.useMemo(() => {
    if (!selectedSymbol || !livePrices || !livePrices[selectedSymbol] || !transactions) return [];
    const hist = livePrices[selectedSymbol].historical || [];
    if (hist.length === 0) return [];
    
    const sortedTxs = [...transactions].filter(t => t.symbol === selectedSymbol).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sortedTxs.length === 0) return [];
    
    const firstDateMs = new Date(sortedTxs[0].date).getTime();
    const data = [];
    let currentShares = 0;
    let txIdx = 0;
    
    for (const h of hist) {
      const hDateMs = new Date(h.date).getTime();
      if (hDateMs < firstDateMs) continue;
      
      while (txIdx < sortedTxs.length && new Date(sortedTxs[txIdx].date).getTime() <= hDateMs) {
        const tx = sortedTxs[txIdx];
        if (tx.type === 'BUY' || tx.type === 'TXIN') currentShares += tx.shares;
        if (tx.type === 'SELL' || tx.type === 'TXOUT') currentShares -= tx.shares;
        txIdx++;
      }
      
      data.push({ date: h.date, value: currentShares * h.close });
      
      // Stop charting if the position is fully closed and we have processed all transactions
      if (currentShares <= 0.00001 && txIdx >= sortedTxs.length) {
         break;
      }
    }
    return data;
  }, [selectedSymbol, livePrices, transactions]);

  const stockTransactions = React.useMemo(() => {
    if (!selectedSymbol || !transactions) return [];
    return [...transactions].filter(t => t.symbol === selectedSymbol).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedSymbol, transactions]);

  const currentShares = React.useMemo(() => {
    if (!selectedSymbol || !transactions) return 0;
    return transactions.filter(t => t.symbol === selectedSymbol).reduce((acc, tx) => {
      if (tx.type === 'BUY' || tx.type === 'TXIN') return acc + tx.shares;
      if (tx.type === 'SELL' || tx.type === 'TXOUT') return acc - tx.shares;
      return acc;
    }, 0);
  }, [selectedSymbol, transactions]);

  React.useEffect(() => {
    if (isSellOpen && selectedSymbol && livePrices?.[selectedSymbol]) {
      setSellShares(currentShares);
      setSellPrice(livePrices[selectedSymbol].price);
    }
  }, [isSellOpen, selectedSymbol, currentShares, livePrices]);

  const handleSell = () => {
    if (!selectedSymbol) return;
    const shares = parseFloat(sellShares.toString());
    const price = parseFloat(sellPrice.toString());
    if (isNaN(shares) || isNaN(price) || shares <= 0 || price < 0) return;

    addTransaction({
      id: Math.random().toString(36).substring(7),
      symbol: selectedSymbol,
      date: new Date().toISOString().split('T')[0],
      type: "SELL",
      price: price,
      shares: shares,
      fees: 0,
      assetClass: "Stock",
      createdAt: new Date().toISOString()
    });
    setIsSellOpen(false);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-md shadow-lg text-sm">
          <p className="text-muted-foreground mb-1">{label}</p>
          <p className="font-semibold text-mint">
            ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DetailSheet
      open={selectedSymbol !== null}
      onOpenChange={(v) => {
        if (!v) {
          setSelectedSymbol(null);
          setIsSellOpen(false);
        }
      }}
      eyebrow="Stock Performance"
      title={
        selectedSymbol ? (
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            <span>{selectedSymbol} {livePrices?.[selectedSymbol]?.longName ? `— ${livePrices[selectedSymbol].longName}` : ''}</span>
            {livePrices?.[selectedSymbol]?.price !== undefined && (
              <span className="flex items-center gap-2 text-lg mt-1 sm:mt-0 font-medium">
                <span>${livePrices[selectedSymbol].price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                {livePrices[selectedSymbol].previousClose !== undefined && livePrices[selectedSymbol].previousClose > 0 && (
                  (() => {
                    const price = livePrices[selectedSymbol].price;
                    const prev = livePrices[selectedSymbol].previousClose;
                    const diff = price - prev;
                    const pct = (diff / prev) * 100;
                    return (
                      <span className={`text-sm ${diff >= 0 ? "text-positive" : "text-negative"}`}>
                        {diff >= 0 ? "+" : ""}{diff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({diff >= 0 ? "+" : ""}{pct.toFixed(2)}%)
                      </span>
                    );
                  })()
                )}
              </span>
            )}
          </div>
        ) : ""
      }
      description="Historical value of your position from inception."
    >
      <div className="absolute top-4 right-10">
        <Dialog open={isSellOpen} onOpenChange={setIsSellOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="destructive" className="h-8">Sell Position</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sell {selectedSymbol}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Shares to Sell</Label>
                <Input 
                  type="number" 
                  value={sellShares} 
                  onChange={(e) => setSellShares(e.target.value)}
                  max={currentShares}
                />
                <p className="text-xs text-muted-foreground">You own {currentShares} shares</p>
              </div>
              <div className="space-y-2">
                <Label>Price per Share ($)</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  value={sellPrice} 
                  onChange={(e) => setSellPrice(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSellOpen(false)}>Cancel</Button>
              <Button onClick={handleSell}>Confirm Sale</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="px-4 pt-4 sm:px-6">
         {positionMetrics && returnPercentage !== undefined && (
            <div className="flex flex-wrap gap-6 mb-2 border-b border-border pb-4">
               <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Return</p>
                  <p className={`font-semibold ${returnPercentage >= 0 ? "text-positive" : "text-negative"}`}>
                     {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(2)}% 
                     {totalReturn !== undefined && ` ($${Math.abs(totalReturn).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`}
                  </p>
               </div>
               <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">TWR</p>
                  <p className="font-semibold text-foreground">{positionMetrics.twr.toFixed(2)}%</p>
               </div>
               <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">MWR</p>
                  <p className="font-semibold text-foreground">{positionMetrics.mwr.toFixed(2)}%</p>
               </div>
            </div>
         )}
      </div>
      <div className="p-4 sm:p-6 h-[400px]">
         {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} 
                  tickLine={false}
                  axisLine={false}
                  minTickGap={30}
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return `${d.getMonth()+1}/${d.getFullYear().toString().slice(2)}`;
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} 
                  tickLine={false}
                  axisLine={false}
                  width={60}
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-mint)" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "var(--color-mint)" }}
                />
              </LineChart>
            </ResponsiveContainer>
         ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No historical data available.
            </div>
         )}
      </div>
      {stockTransactions.length > 0 && (
        <div className="p-4 sm:p-6 border-t border-border bg-card">
           <h3 className="font-semibold text-sm mb-4">Recent Transactions</h3>
           <div className="divide-y divide-border/60">
              {stockTransactions.map(tx => (
                <div key={tx.id} className="flex justify-between py-3 text-sm items-center">
                   <div>
                      <span className={`label-xs rounded-sm px-2.5 py-1 mr-3 ${tx.type === 'BUY' || tx.type === 'TXIN' ? 'bg-positive/15 text-positive' : 'bg-negative/15 text-negative'}`}>{tx.type}</span>
                      <span className="text-muted-foreground font-medium">{tx.date}</span>
                   </div>
                   <div className="text-right">
                      <p className="font-semibold">{tx.shares} @ ${tx.price.toFixed(2)}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </DetailSheet>
  );
}
