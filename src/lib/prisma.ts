import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.includes('pooled.db.prisma.io') && !dbUrl.includes('pgbouncer=true')) {
  dbUrl += (dbUrl.includes('?') ? '&' : '?') + 'pgbouncer=true';
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
    datasources: {
      ...(dbUrl ? { db: { url: dbUrl } } : {})
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
