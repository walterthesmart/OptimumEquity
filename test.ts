import { prisma } from './src/lib/prisma.js'; 

async function main() {
  const transactions = await prisma.transaction.findMany();
  console.log("TRANSACTIONS FROM DB:", transactions);
}

main().catch(console.error);
