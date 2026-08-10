import { prisma } from './src/lib/prisma';
import fs from 'fs';

async function main() {
  console.log("Fetching transactions...");
  const txs = await prisma.transaction.findMany();
  console.log(`Found ${txs.length} transactions.`);
  fs.mkdirSync('src/data', { recursive: true });
  fs.writeFileSync('src/data/transactions.json', JSON.stringify(txs, null, 2));
  console.log("Successfully exported to src/data/transactions.json");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
