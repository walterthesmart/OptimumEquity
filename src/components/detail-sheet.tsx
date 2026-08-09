import { type ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function DetailSheet({
  open,
  onOpenChange,
  title,
  eyebrow,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto border-l border-border bg-background p-0 sm:max-w-xl"
      >
        <SheetHeader className="gap-2 border-b border-border bg-card px-5 py-5 sm:px-6">
          {eyebrow ? <span className="label-xs text-mint">{eyebrow}</span> : null}
          <SheetTitle className="text-xl font-semibold tracking-tight">{title}</SheetTitle>
          {description ? (
            <SheetDescription className="text-sm leading-relaxed">{description}</SheetDescription>
          ) : null}
        </SheetHeader>
        <div className="space-y-5 px-5 py-6 sm:px-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export function PanelBlock({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="surface p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="label-xs text-muted-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatRow({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  tone?: "default" | "mint" | "sand" | "negative" | "positive";
}) {
  const toneClass = {
    default: "text-foreground",
    mint: "text-mint",
    sand: "text-sand",
    negative: "text-negative",
    positive: "text-positive",
  }[tone];
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`numeric text-sm font-semibold ${toneClass}`}>{value}</span>
    </div>
  );
}
