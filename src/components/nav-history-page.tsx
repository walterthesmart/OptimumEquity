import { useMemo } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { calculateHistoricalNAV } from "@/lib/calculations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function NavHistoryPage() {
  const { transactions, livePrices } = usePortfolio();

  const history = useMemo(() => {
    return calculateHistoricalNAV(transactions, livePrices).reverse(); // Reverse to show latest first
  }, [transactions, livePrices]);

  return (
    <div className="surface rounded-lg border border-border bg-card overflow-hidden">
      <div className="border-b border-border p-4 sm:px-6 py-4 flex items-center justify-between">
        <h3 className="font-semibold tracking-tight text-lg">Historical NAV</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="text-right">Net Assets</TableHead>
              <TableHead className="text-right">Shares Outstanding</TableHead>
              <TableHead className="text-right">NAV</TableHead>
              <TableHead className="text-right">Daily Return</TableHead>
              <TableHead className="text-right">Total Return</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No historical NAV data available.
                </TableCell>
              </TableRow>
            ) : (
              history.map((row) => (
                <TableRow key={row.date} className="group hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium whitespace-nowrap">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-right numeric">
                    ${row.netAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right numeric">
                    {row.sharesOutstanding.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right numeric font-semibold">
                    ${row.nav.toFixed(2)}
                  </TableCell>
                  <TableCell className={`text-right numeric ${row.dailyReturn > 0 ? 'text-positive' : row.dailyReturn < 0 ? 'text-negative' : 'text-muted-foreground'}`}>
                    {row.dailyReturn > 0 ? '+' : ''}{(row.dailyReturn * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell className={`text-right numeric ${row.totalReturn > 0 ? 'text-positive' : row.totalReturn < 0 ? 'text-negative' : 'text-muted-foreground'}`}>
                    {row.totalReturn > 0 ? '+' : ''}{(row.totalReturn * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
