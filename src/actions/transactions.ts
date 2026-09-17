"use server";

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

export async function getTransactions() {
  console.log("Backend: getTransactions called");
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'asc' },
    });
    console.log(`Backend: found ${transactions.length} transactions`);
    return { data: transactions as Transaction[] };
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return { error: 'Internal server error' };
  }
}

export async function addTransaction(input: any) {
  try {
    const data = transactionSchema.parse(input);
    const tx = await prisma.transaction.create({ data });
    return { data: tx as Transaction };
  } catch (error) {
    console.error('Failed to create transaction:', error);
    return { error: 'Internal server error' };
  }
}

export async function addBulkTransactions(input: any) {
  try {
    const data = bulkTransactionSchema.parse(input);
    const result = await prisma.$transaction(
      data.map(tx => prisma.transaction.create({ data: tx }))
    );
    return { data: result as Transaction[] };
  } catch (error) {
    console.error('Failed to create transactions:', error);
    return { error: 'Internal server error' };
  }
}

export async function removeTransaction(input: { id: string }) {
  try {
    const { id } = z.object({ id: z.string() }).parse(input);
    await prisma.transaction.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete transaction:', error);
    return { error: 'Internal server error' };
  }
}

export async function clearAllTransactions() {
  try {
    await prisma.transaction.deleteMany();
    return { success: true };
  } catch (error) {
    console.error('Failed to clear transactions:', error);
    return { error: 'Internal server error' };
  }
}
