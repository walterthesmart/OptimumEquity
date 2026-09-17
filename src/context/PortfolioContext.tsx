import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { Transaction, PriceData } from '../types';
import { getPrices } from '../actions/prices';
import { 
  getTransactions, 
  addTransaction as apiAddTransaction, 
  removeTransaction as apiRemoveTransaction, 
  clearAllTransactions as apiClearAllTransactions,
  addBulkTransactions as apiAddBulkTransactions
} from '../actions/transactions';

interface PortfolioContextType {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => Promise<void>;
  importTransactions: (txs: Transaction[]) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  clearTransactions: () => Promise<void>;
  livePrices: Record<string, PriceData>;
  isLoadingPrices: boolean;
  refreshPrices: () => Promise<void>;
  customPrices: Record<string, number>;
  updateCustomPrice: (symbol: string, price: number | null) => void;
  excludedSymbols: string[];
  setExcludedSymbols: React.Dispatch<React.SetStateAction<string[]>>;
  startDate: string | null;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  endDate: string | null;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children, initialTransactions = [], initialPrices = {} }: { children: ReactNode, initialTransactions?: Transaction[], initialPrices?: Record<string, PriceData> }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [fetchedPrices, setFetchedPrices] = useState<Record<string, PriceData>>(initialPrices);
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [excludedSymbols, setExcludedSymbols] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  useEffect(() => {
    const savedCustomPrices = localStorage.getItem('portfolio_custom_prices');
    if (savedCustomPrices) {
      try {
        setCustomPrices(JSON.parse(savedCustomPrices));
      } catch (e) {
        console.error('Failed to parse saved custom prices');
      }
    }
    
    // Transactions are now passed in via initialTransactions from the route loader
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('portfolio_custom_prices', JSON.stringify(customPrices));
    }
  }, [customPrices, isInitialized]);

  const refreshPrices = useCallback(async () => {
    // Only fetch prices for current holdings (net shares > 0) to avoid rate limits
    const holdings: Record<string, number> = {};
    transactions.forEach(tx => {
      if (tx.symbol !== 'GEF Cash' && tx.symbol !== 'Cash') {
        if (tx.type === 'BUY') {
          holdings[tx.symbol] = (holdings[tx.symbol] || 0) + tx.shares;
        } else if (tx.type === 'SELL') {
          holdings[tx.symbol] = (holdings[tx.symbol] || 0) - tx.shares;
        }
      }
    });
    
    const activeSymbols = Object.entries(holdings)
      .filter(([_, shares]) => shares > 0.000001)
      .map(([sym]) => sym);
      
    const symbols = Array.from(new Set(activeSymbols));
    if (!symbols.includes('URTH')) symbols.push('URTH');
    if (symbols.length === 0) return;

    setIsLoadingPrices(true);
    
    let earliestDate: string | undefined;
    if (transactions.length > 0) {
      const earliest = transactions.reduce((earliestTx, currentTx) => {
        return new Date(currentTx.date) < new Date(earliestTx.date) ? currentTx : earliestTx;
      });
      earliestDate = earliest.date;
    }

    try {
      const res = await getPrices({ data: { symbols, startDate: earliestDate } });
      if (res.data) {
        setFetchedPrices(res.data);
      }
    } catch (e) {
      console.error('Error fetching prices:', e);
    } finally {
      setIsLoadingPrices(false);
    }
  }, [transactions]);

  useEffect(() => {
    if (isInitialized && transactions.length > 0) {
      refreshPrices();
    }
  }, [transactions, isInitialized, refreshPrices]);

  // Database state modification
  const addTransaction = async (tx: Transaction) => {
    try {
      const res = await apiAddTransaction({ data: tx });
      if (res.data) {
        setTransactions((prev) => [...prev, res.data as Transaction]);
      } else {
        console.error(res.error);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  const importTransactions = async (txs: Transaction[]) => {
    try {
      const res = await apiAddBulkTransactions({ data: txs });
      if (res.data) {
        const fresh = await getTransactions();
        if (fresh.data) {
          setTransactions(fresh.data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  const deleteTransaction = async (id: string) => {
    try {
      const res = await apiRemoveTransaction({ data: { id } });
      if (res.success) {
        setTransactions((prev) => prev.filter(tx => tx.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  const clearTransactions = async () => {
    try {
      const res = await apiClearAllTransactions();
      if (res.success) {
        setTransactions([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateCustomPrice = (symbol: string, price: number | null) => {
    setCustomPrices((prev) => {
      const next = { ...prev };
      if (price === null) {
        delete next[symbol];
      } else {
        next[symbol] = price;
      }
      return next;
    });
  };

  const livePrices = useMemo(() => {
    const merged = { ...fetchedPrices };
    Object.keys(customPrices).forEach(sym => {
      if (!merged[sym] || merged[sym] === null) {
        merged[sym] = { price: customPrices[sym], previousClose: 0, currency: 'USD', longName: sym, historical: [] };
      } else {
        merged[sym] = { ...merged[sym], price: customPrices[sym] };
      }
    });
    return merged;
  }, [fetchedPrices, customPrices]);

  return (
    <PortfolioContext.Provider
      value={{
        transactions,
        addTransaction,
        importTransactions,
        deleteTransaction,
        clearTransactions,
        livePrices,
        isLoadingPrices,
        refreshPrices,
        customPrices,
        updateCustomPrice,
        excludedSymbols,
        setExcludedSymbols,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
