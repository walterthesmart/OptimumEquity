"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { PortfolioProvider } from "@/context/PortfolioContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioProvider>
        {children}
      </PortfolioProvider>
    </QueryClientProvider>
  );
}
