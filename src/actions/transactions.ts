import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";
import type { Transaction, PriceData } from "../types";
import { z } from "zod";

const transactionSchema = z.object({
  id: z.string().optional(),
  symbol: z.string().min(1),
  date: z.string(),
  type: z.enum(['BUY', 'SELL', 'TXIN', 'TXOUT']),
  price: z.number().nonnegative(),
  shares: z.number().nonnegative(),
  fees: z.number().nonnegative().default(0),
  assetClass: z.string().default('Stock'),
});

const bulkTransactionSchema = z.array(transactionSchema);

export const getTransactions = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: { date: 'asc' },
      });
      return { data: transactions as Transaction[] };
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return { error: 'Internal server error' };
    }
  });

export const addTransaction = createServerFn({ method: "POST" })
  .validator(transactionSchema)
  .handler(async ({ data }) => {
    try {
      const tx = await prisma.transaction.create({ data });
      return { data: tx as Transaction };
    } catch (error) {
      console.error('Failed to create transaction:', error);
      return { error: 'Internal server error' };
    }
  });

export const addBulkTransactions = createServerFn({ method: "POST" })
  .validator(bulkTransactionSchema)
  .handler(async ({ data }) => {
    try {
      const result = await prisma.$transaction(
        data.map(tx => prisma.transaction.create({ data: tx }))
      );
      return { data: result as Transaction[] };
    } catch (error) {
      console.error('Failed to create transactions:', error);
      return { error: 'Internal server error' };
    }
  });

export const removeTransaction = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    try {
      await prisma.transaction.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      return { error: 'Internal server error' };
    }
  });

export const clearAllTransactions = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      await prisma.transaction.deleteMany();
      return { success: true };
    } catch (error) {
      console.error('Failed to clear transactions:', error);
      return { error: 'Internal server error' };
    }
  });
