import { useMemo } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { calculateHistoricalNAV } from "@/lib/calculations";
import Papa from "papaparse";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const handleDownload = () => {
    const csv = Papa.unparse(history.map(row => ({
      Date: row.date,
      "Net Assets": row.netAssets,
      "Shares Outstanding": row.sharesOutstanding,
      "NAV": row.nav,
      "Daily Return": row.dailyReturn,
      "Total Return": row.totalReturn,
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'historical-nav.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="surface rounded-lg border border-border bg-card overflow-hidden">
      <div className="border-b border-border p-4 sm:px-6 py-4 flex items-center justify-between">
        <h3 className="font-semibold tracking-tight text-lg">Historical NAV</h3>
        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download CSV
        </Button>
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
