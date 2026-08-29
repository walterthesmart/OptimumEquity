import { type ReactNode, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ChevronLeft,
  LayoutGrid,
  PieChart,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export type SectionId = "overview" | "transactions" | "navHistory";

export const sections: { id: SectionId; label: string; short: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", short: "Home", icon: LayoutGrid },
  { id: "transactions", label: "Transactions", short: "History", icon: Activity },
  { id: "navHistory", label: "NAV History", short: "NAV", icon: Sparkles },
];

export function AppShell({
  active,
  onChange,
  date,
  children,
}: {
  active: SectionId;
  onChange: (s: SectionId) => void;
  date: string;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background bg-[radial-gradient(120%_80%_at_0%_0%,color-mix(in_oklab,var(--color-mint)_14%,transparent),transparent_55%),radial-gradient(100%_70%_at_100%_0%,color-mix(in_oklab,var(--color-sand)_12%,transparent),transparent_60%)]">
      {/* Desktop rail */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur transition-[width] duration-200 md:flex ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4">
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">Optimum Equity</p>
              <p className="truncate text-[11px] text-muted-foreground">Portfolio Tracker</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onChange(s.id)}
                title={s.label}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-mint" : ""}`} />
                {!collapsed && <span className="truncate">{s.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-2">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          >
            <ChevronLeft
              className={`h-4 w-4 shrink-0 transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
                {sections.find((s) => s.id === active)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="numeric hidden rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground sm:inline-block">
                {date}
              </span>
              <button
                type="button"
                className="hidden h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Sync
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Sparkles className="h-3.5 w-3.5" /> AI Insights
              </button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pt-5 pb-28 sm:px-6 md:pb-10">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 z-50 w-full border-t border-border/40 bg-background/80 px-2 pb-safe pt-2 backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-2">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onChange(s.id)}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive ? "text-mint" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {s.short}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
