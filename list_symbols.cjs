const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const txs = await prisma.transaction.findMany({
    select: { symbol: true }
  });
  const symbols = [...new Set(txs.map(t => t.symbol))];
  console.log(symbols);
}
main().catch(console.error).finally(() => prisma.$disconnect());
