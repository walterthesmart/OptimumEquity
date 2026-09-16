import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('Reading transactions.json...');
  const data = JSON.parse(fs.readFileSync('./src/data/transactions.json', 'utf8'));
  
  console.log(`Found ${data.length} transactions. Starting migration to Postgres...`);
  
  const formattedData = data.map(tx => ({
    id: tx.id,
    symbol: tx.symbol,
    date: tx.date,
    type: tx.type,
    price: tx.price,
    shares: tx.shares,
    fees: tx.fees || 0,
    assetClass: tx.assetClass || 'Stock',
    createdAt: tx.createdAt ? new Date(tx.createdAt) : new Date()
  }));

  const result = await prisma.transaction.createMany({
    data: formattedData,
    skipDuplicates: true, // Prevents errors if we run it twice
  });
  
  console.log(`Successfully migrated ${result.count} transactions!`);
}

main()
  .catch(e => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
