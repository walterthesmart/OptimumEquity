import { PrismaClient } from '@prisma/client';

const dbUrl = process.env.DATABASE_URL || "postgres://3311796110bf58f00e928c02c0de98ab4db04718cb8f8637386d5e6a312ab05e:sk_Sltno9O7WdfN2Co_FsVLM@pooled.db.prisma.io:5432/postgres?sslmode=require&pgbouncer=true";

const prisma = new PrismaClient({
  datasources: {
    db: { url: dbUrl }
  }
});

async function main() {
  const transactions = await prisma.transaction.findMany();
  console.log("Transactions count:", transactions.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
