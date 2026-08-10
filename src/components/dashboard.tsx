import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ChevronRight,
  CircleDollarSign,
  CircleDot,
  Globe2,
  Minus,
  Plus,
  TrendingDown,
  TrendingUp,
  LineChart,
  PieChart
} from "lucide-react";
import { AppShell, type SectionId } from "@/components/app-shell";
import { DetailSheet, PanelBlock } from "@/components/detail-sheet";
import { TransactionPanel, PositionsPanel } from "@/components/panels";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePortfolio } from "@/context/PortfolioContext";
import { calculatePositions, calculateOverallMetrics, calculateAdvancedMetrics } from "@/lib/calculations";
import { formatDate } from "@/lib/macro-data";
import { TransactionsPage } from "./transactions-page";

type ModalId = "transactions" | "positions" | "performance" | null;

function SummaryCard({
  label,
  value,
  meta,
  metaTone,
  icon: Icon,
  onClick,
}: {
  label: string;
  value: string;
  meta: string;
  metaTone: "mint" | "sand" | "negative" | "muted" | "positive";
  icon: typeof Globe2;
  onClick: () => void;
}) {
  const tone = {
    mint: "bg-mint/15 text-mint",
    sand: "bg-sand/20 text-sand",
    positive: "bg-positive/15 text-positive",
    negative: "bg-negative/15 text-negative",
    muted: "bg-muted text-muted-foreground",
  }[metaTone];
  return (
    <button
      type="button"
      onClick={onClick}
      className="surface group flex flex-col justify-between gap-4 p-4 text-left transition-colors hover:border-mint/50 hover:bg-accent/40 sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="label-xs text-muted-foreground">{label}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div>
        <p className="numeric text-2xl leading-tight font-semibold sm:text-3xl">{value}</p>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className={`label-xs rounded-sm px-2 py-1 ${tone}`}>{meta}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </button>
  );
}

export function Dashboard() {
  const [section, setSection] = useState<SectionId>("overview");
  const [modal, setModal] = useState<ModalId>(null);
  const { transactions, livePrices, startDate } = usePortfolio();
  
  const positions = useMemo(() => calculatePositions(transactions, livePrices, startDate), [transactions, livePrices, startDate]);
  const metrics = useMemo(() => calculateOverallMetrics(transactions, positions), [transactions, positions]);
  const advanced = useMemo(() => calculateAdvancedMetrics(transactions, livePrices, metrics.totalValue, startDate), [transactions, livePrices, metrics.totalValue, startDate]);
  
  const cashPosition = positions.find(p => p.symbol === 'GEF Cash');
  const cashBuffer = cashPosition ? (cashPosition.currentValue / metrics.totalValue) * 100 : 0;
  
  const date = formatDate(new Date());

  const summaryCards = {
    totalValue: (
      <SummaryCard
        key="totalValue"
        label="Portfolio Value"
        value={`$${metrics.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        meta={metrics.returnPercentage >= 0 ? `+${metrics.returnPercentage.toFixed(2)}% Return` : `${metrics.returnPercentage.toFixed(2)}% Return`}
        metaTone={metrics.returnPercentage >= 0 ? "positive" : "negative"}
        icon={Globe2}
        onClick={() => setModal("positions")}
      />
    ),
    twr: (
      <SummaryCard
        key="twr"
        label="Time-Weighted Return"
        value={`${advanced.twr > 0 ? '+' : ''}${advanced.twr.toFixed(2)}%`}
        meta={`TWR Performance`}
        metaTone={advanced.twr >= 0 ? "mint" : "sand"}
        icon={LineChart}
        onClick={() => setModal("performance")}
      />
    ),
    cash: (
      <SummaryCard
        key="cash"
        label="Cash Buffer"
        value={`${cashBuffer.toFixed(2)}%`}
        meta={`$${cashPosition?.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`}
        metaTone="muted"
        icon={CircleDollarSign}
        onClick={() => setModal("positions")}
      />
    ),
    transactions: (
      <SummaryCard
        key="transactions"
        label="Transactions"
        value={`${transactions.length}`}
        meta="History"
        metaTone="muted"
        icon={AlertTriangle}
        onClick={() => setSection("transactions")}
      />
    ),
  } as const;

  const sectionCards: Record<SectionId, (keyof typeof summaryCards)[]> = {
    overview: ["totalValue", "twr", "cash", "transactions"],
    transactions: [],
  };

  const visible = sectionCards[section];
  const summary = (
    <div
      className={`grid grid-cols-1 gap-3 ${
        visible.length === 4
          ? "sm:grid-cols-2 xl:grid-cols-4"
          : visible.length === 2
            ? "sm:grid-cols-2"
            : ""
      }`}
    >
      {visible.map((k) => summaryCards[k])}
    </div>
  );

  const mainView = (
    <div className="grid grid-cols-1 gap-3">
       {section === "overview" && (
         <PositionsPanel positions={positions} metrics={metrics} transactions={transactions} livePrices={livePrices} startDate={startDate} />
       )}
       {section === "transactions" && (
         <TransactionsPage positions={positions} />
       )}
    </div>
  );

  return (
    <AppShell active={section} onChange={setSection} date={date}>
      <div className="mx-auto w-full max-w-7xl space-y-4">
        {summary}
        {mainView}
      </div>

      <DetailSheet
        open={modal === "transactions"}
        onOpenChange={(v) => setModal(v ? "transactions" : null)}
        eyebrow="Portfolio Data"
        title="Transactions"
        description="View your recent transactions and import new data via CSV."
      >
        <TransactionPanel />
      </DetailSheet>

      <DetailSheet
        open={modal === "positions"}
        onOpenChange={(v) => setModal(v ? "positions" : null)}
        eyebrow="Asset Allocation"
        title="Holdings"
        description="Review your active positions and their current weights."
      >
        <div className="p-4 space-y-4">
           <div className="grid grid-cols-2 gap-4 mb-2 border-b border-border/60 pb-6">
              <div>
                 <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Current Value</p>
                 <p className="font-semibold text-lg">${metrics.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                 <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Cost</p>
                 <p className="font-semibold text-lg">${metrics.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                 <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Cash Balance</p>
                 <p className="font-semibold text-lg text-mint">${cashPosition?.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</p>
              </div>
              <div>
                 <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Cash Buffer</p>
                 <p className="font-semibold text-lg text-muted-foreground">{cashBuffer.toFixed(2)}%</p>
              </div>
           </div>
           {positions.map(pos => (
              <div key={pos.symbol} className="flex justify-between items-center bg-card p-3 rounded-md border border-border">
                 <div>
                    <div className="font-semibold flex items-baseline gap-2">
                      {pos.symbol}
                      <span className="text-xs text-muted-foreground font-normal truncate max-w-[150px] inline-block">{livePrices[pos.symbol]?.longName}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{pos.shares} shares @ ${pos.averagePrice.toFixed(2)}</div>
                 </div>
                 <div className="text-right">
                    <div className="font-semibold">${pos.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className={`text-xs ${pos.returnPercentage >= 0 ? 'text-positive' : 'text-negative'}`}>
                       {pos.returnPercentage >= 0 ? '+' : ''}{pos.returnPercentage.toFixed(2)}%
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </DetailSheet>
      
      <DetailSheet
        open={modal === "performance"}
        onOpenChange={(v) => setModal(v ? "performance" : null)}
        eyebrow="Advanced Metrics"
        title="Performance"
        description="Detailed return calculations based on cash flows."
      >
        <PanelBlock title="Returns summary">
            <div className="space-y-3 p-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time-Weighted Return (TWR)</span>
                <span className="font-semibold text-mint">{advanced.twr.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Money-Weighted Return (MWR)</span>
                <span className="font-semibold text-sand">{advanced.mwr.toFixed(2)}%</span>
              </div>
            </div>
        </PanelBlock>
      </DetailSheet>
    </AppShell>
  );
}
