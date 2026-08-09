export type Trend = "rising" | "neutral" | "falling";

export type Indicator = {
  id: string;
  name: string;
  weight: number; // 0-1
  value: number;
  step: number;
  unit?: string;
  rising: number; // value above => rising
  falling: number; // value below => falling
  guide: string;
  invert?: boolean; // higher value = falling signal
};

export const growthIndicators: Indicator[] = [
  {
    id: "ism-mfg",
    name: "ISM Manufacturing PMI",
    weight: 0.2,
    value: 52.3,
    step: 0.1,
    rising: 52,
    falling: 48,
    guide: ">52 rising · 48–52 neutral · <48 falling",
  },
  {
    id: "ism-svc",
    name: "ISM Services PMI",
    weight: 0.2,
    value: 54,
    step: 0.1,
    rising: 54,
    falling: 50,
    guide: ">54 rising · 50–54 neutral · <50 falling",
  },
  {
    id: "nfp",
    name: "Non-Farm Payrolls (3mo avg)",
    weight: 0.15,
    value: 68.3,
    step: 0.1,
    unit: "K",
    rising: 200,
    falling: 100,
    guide: ">200K rising · 100–200K neutral · <100K falling",
  },
  {
    id: "earnings",
    name: "Earnings Revisions Breadth",
    weight: 0.15,
    value: 49.05,
    step: 0.05,
    unit: "%",
    rising: 55,
    falling: 45,
    guide: ">55% rising · 45–55% neutral · <45% falling",
  },
  {
    id: "hy-spread",
    name: "HY Credit Spread",
    weight: 0.15,
    value: 272,
    step: 1,
    unit: "bps",
    rising: 250,
    falling: 270,
    invert: true,
    guide: "<250 tightening · 250–270 neutral · >270 widening",
  },
  {
    id: "curve",
    name: "Yield Curve (10Y–2Y)",
    weight: 0.15,
    value: 51.98,
    step: 0.01,
    unit: "bps",
    rising: 50,
    falling: 0,
    guide: ">50 rising · 0–50 neutral · <0 inverted",
  },
];

export const inflationIndicators: Indicator[] = [
  {
    id: "cpi",
    name: "Core CPI YoY",
    weight: 0.25,
    value: 2.6,
    step: 0.1,
    unit: "%",
    rising: 3.5,
    falling: 2,
    guide: ">3.5% rising · 2–3.5% neutral · <2% falling",
  },
  {
    id: "pce",
    name: "Core PCE YoY",
    weight: 0.2,
    value: 3,
    step: 0.1,
    unit: "%",
    rising: 2.8,
    falling: 2,
    guide: ">2.8% rising · 2–2.8% neutral · <2% falling",
  },
  {
    id: "breakeven",
    name: "5Y Breakeven Inflation",
    weight: 0.2,
    value: 2.61,
    step: 0.01,
    unit: "%",
    rising: 2.5,
    falling: 2,
    guide: ">2.5% rising · 2–2.5% neutral · <2% falling",
  },
  {
    id: "ppi",
    name: "PPI Pipeline YoY",
    weight: 0.15,
    value: 4.1,
    step: 0.1,
    unit: "%",
    rising: 3,
    falling: 0,
    guide: ">3% rising · 0–3% neutral · <0% falling",
  },
  {
    id: "ahe",
    name: "Avg Hourly Earnings YoY",
    weight: 0.1,
    value: 0.2,
    step: 0.1,
    unit: "%",
    rising: 4,
    falling: 3,
    guide: ">4% rising · 3–4% neutral · <3% falling",
  },
  {
    id: "commodity",
    name: "Commodity Index Trend (3mo)",
    weight: 0.1,
    value: 17.97,
    step: 0.01,
    unit: "%",
    rising: 5,
    falling: -5,
    guide: ">5% rising · -5 to 5% neutral · <-5% falling",
  },
];

export function trendOf(i: Indicator): Trend {
  if (i.invert) {
    if (i.value > i.falling) return "falling";
    if (i.value < i.rising) return "rising";
    return "neutral";
  }
  if (i.value > i.rising) return "rising";
  if (i.value < i.falling) return "falling";
  return "neutral";
}

export function weightedScore(list: Indicator[]) {
  return list.reduce((acc, i) => {
    const t = trendOf(i);
    return acc + i.weight * (t === "rising" ? 1 : t === "falling" ? -1 : 0);
  }, 0);
}

export function scoreLabel(score: number): Trend {
  if (score > 0.15) return "rising";
  if (score < -0.15) return "falling";
  return "neutral";
}

export type RegimeKey = "goldilocks" | "reflation" | "stagflation" | "deflation" | "transitional";

export function resolveRegime(growth: number, inflation: number) {
  const g = scoreLabel(growth);
  const i = scoreLabel(inflation);
  if (g === "neutral" || i === "neutral") {
    return { key: "transitional" as RegimeKey, label: "Transitional" };
  }
  if (g === "rising" && i === "rising") return { key: "reflation" as RegimeKey, label: "Reflation" };
  if (g === "rising" && i === "falling")
    return { key: "goldilocks" as RegimeKey, label: "Goldilocks" };
  if (g === "falling" && i === "rising")
    return { key: "stagflation" as RegimeKey, label: "Stagflation" };
  return { key: "deflation" as RegimeKey, label: "Deflation" };
}

export function regimeConfidence(growth: number, inflation: number) {
  const strength = (Math.abs(growth) + Math.abs(inflation)) / 2;
  if (strength > 0.45) return "High";
  if (strength > 0.2) return "Moderate";
  return "Low";
}

/* ---------------- Cycle ---------------- */

export type CycleIndicator = {
  id: string;
  name: string;
  source: string;
  weight: number;
  score: number;
  guide: string;
};

export const cycleIndicators: CycleIndicator[] = [
  {
    id: "credit",
    name: "Credit Availability",
    source: "Senior Loan Officer Survey",
    weight: 0.12,
    score: 3,
    guide: "1=frozen 2=tight 3=normal 4=easy 5=reckless lending",
  },
  {
    id: "risk",
    name: "Risk Appetite",
    source: "AAII Sentiment",
    weight: 0.12,
    score: 3,
    guide: "1=panic 2=cautious 3=balanced 4=optimistic 5=euphoric",
  },
  {
    id: "valuation",
    name: "Equity Valuations",
    source: "S&P 500 Fwd P/E",
    weight: 0.12,
    score: 5,
    guide: "1=deep value 2=cheap 3=fair 4=rich 5=extreme",
  },
  {
    id: "ipo",
    name: "IPO / Deal Activity",
    source: "League Tables",
    weight: 0.1,
    score: 4,
    guide: "1=frozen 2=quiet 3=normal 4=active 5=frenzy",
  },
  {
    id: "leverage",
    name: "Corporate Leverage",
    source: "Net Debt / EBITDA",
    weight: 0.1,
    score: 2,
    guide: "1=deleveraging 2=conservative 3=moderate 4=aggressive 5=dangerous",
  },
  {
    id: "defaults",
    name: "Default Rates",
    source: "Bloomberg US HY OAS",
    weight: 0.1,
    score: 4,
    guide: "1=elevated 2=rising 3=normal 4=low 5=near-zero",
  },
  {
    id: "vol",
    name: "Implied Volatility",
    source: "VIX Level",
    weight: 0.1,
    score: 4,
    guide: "1=VIX>35 2=25–35 3=18–25 4=12–18 5=VIX<12",
  },
  {
    id: "capmkts",
    name: "Capital Markets",
    source: "HY Issuance",
    weight: 0.08,
    score: 4,
    guide: "1=shut 2=selective 3=open 4=wide open 5=anything goes",
  },
  {
    id: "media",
    name: "Media Tone",
    source: "SF Fed News Sentiment",
    weight: 0.08,
    score: 3,
    guide: '1=doom 2=worried 3=balanced 4=optimistic 5="this time is different"',
  },
  {
    id: "flows",
    name: "Fund Flows",
    source: "Equity Mutual Fund Flows",
    weight: 0.08,
    score: 4,
    guide: "1=heavy outflows 2=outflows 3=flat 4=inflows 5=record inflows",
  },
];

export function cycleScore(list: CycleIndicator[]) {
  return list.reduce((a, i) => a + i.weight * i.score, 0);
}

export function cyclePhase(score: number) {
  if (score < 2) return { label: "Early Cycle", note: "Maximum aggression. Deploy into fear." };
  if (score < 2.8)
    return { label: "Early-Mid Cycle", note: "Lean in. Risk is being priced generously." };
  if (score < 3.8)
    return {
      label: "Mid Cycle",
      note: "Full deployment, selective. Maintain standard cycle discipline.",
    };
  if (score < 4.4)
    return { label: "Late Cycle", note: "Trim aggression. Raise quality and cash buffer." };
  return { label: "Peak Euphoria", note: "Defensive. Preserve capital, harvest risk." };
}

/* ---------------- Anomalies ---------------- */

export type Anomaly = {
  id: string;
  name: string;
  current: number;
  z: number;
  avg?: number;
  stdev?: number;
};

export const anomalies: Anomaly[] = [
  { id: "vix", name: "VIX", current: 17, z: -0.42 },
  { id: "hyoas", name: "HY OAS (bps)", current: 272, z: -0.99 },
  { id: "dxy", name: "DXY", current: 98.2, z: -0.68 },
  { id: "sbcorr", name: "Stock-Bond Corr", current: -0.047, z: 0.44 },
  { id: "ust10", name: "10Y UST Yield", current: 4.31, z: 1.25 },
  { id: "gold", name: "Gold Price", current: 4790.06, z: 2.73 },
  { id: "vixts", name: "VIX Term Structure", current: -0.5, z: 0.16 },
  { id: "move", name: "MOVE Index", current: 65.9, z: -0.56 },
];

export function anomalyLevel(z: number) {
  const a = Math.abs(z);
  if (a >= 3) return "extreme" as const;
  if (a >= 2) return "elevated" as const;
  return "normal" as const;
}

/* ---------------- Risk overlay ---------------- */

export const riskOverlay = [
  { id: "vix", name: "VIX", state: "Normal", detail: "17", tone: "positive" as const },
  {
    id: "hy",
    name: "HY Credit Spread (OAS)",
    state: "Normal",
    detail: "269",
    tone: "positive" as const,
  },
  {
    id: "dxy",
    name: "DXY (Dollar Index)",
    state: "Normal",
    detail: "98.1",
    tone: "positive" as const,
  },
  {
    id: "corr",
    name: "Cross-Asset Correlation",
    state: "Normal",
    detail: "0.5",
    tone: "positive" as const,
  },
  {
    id: "fed",
    name: "Fed Balance Sheet",
    state: "Tightening",
    detail: "Contracting",
    tone: "negative" as const,
  },
];

/* ---------------- Posture ---------------- */

export type Sleeve = {
  id: string;
  name: string;
  target: number;
  description: string;
  tone: "mint" | "sand" | "negative" | "muted";
};

export function buildPosture(regimeKey: RegimeKey, cycle: number): Sleeve[] {
  const aggression = Math.max(0, Math.min(1, (4.6 - cycle) / 2.6));
  const defensive = regimeKey === "transitional" || regimeKey === "stagflation";
  const core = Math.round((defensive ? 15 : 25) + aggression * 5);
  const tactical = Math.round((defensive ? 10 : 20) * (0.6 + aggression * 0.8));
  const protective = defensive ? 25 : 15;
  const cash = Math.max(0, 100 - core - tactical - protective);
  return [
    {
      id: "core",
      name: "Core Thematic",
      target: core,
      tone: "mint",
      description: "Secular multi-year themes aligned with prevailing regime.",
    },
    {
      id: "tactical",
      name: "Tactical Alpha",
      target: tactical,
      tone: "sand",
      description: "Catalyst positions. 3–9 month horizon to exploit cycle shifts.",
    },
    {
      id: "protective",
      name: "Protective Capital",
      target: protective,
      tone: "negative",
      description: "Hedges, puts, inverse ETFs, gold, volatility strategies.",
    },
    {
      id: "cash",
      name: "Cash Buffer",
      target: cash,
      tone: "muted",
      description: "Cash + ultra-short duration. Dry powder for deployment.",
    },
  ];
}

export function exposureLimits(cycle: number) {
  const scalar = cycle < 2.5 ? 1.25 : cycle < 3.8 ? 1.0 : 0.75;
  return {
    scalar,
    maxNet: Math.round(80 * scalar),
    minNet: -20,
    maxGross: Math.round(150 * scalar),
    maxSingle: 6,
  };
}

export function formatDate(d: Date) {
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-GB", { month: "short" }).toUpperCase();
  return `${day} ${month} ${d.getFullYear()}`;
}
