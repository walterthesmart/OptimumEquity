import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Hardcoded connection string specifically for Vercel deployment without env configuration
let dbUrl = process.env.DATABASE_URL || "postgres://3311796110bf58f00e928c02c0de98ab4db04718cb8f8637386d5e6a312ab05e:sk_Sltno9O7WdfN2Co_FsVLM@pooled.db.prisma.io:5432/postgres?sslmode=require";

if (dbUrl && dbUrl.includes('pooled.db.prisma.io') && !dbUrl.includes('pgbouncer=true')) {
  dbUrl += (dbUrl.includes('?') ? '&' : '?') + 'pgbouncer=true';
}

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: ['query'],
        datasources: {
          ...(dbUrl ? { db: { url: dbUrl } } : {})
        },
      });
    }
    return (globalForPrisma.prisma as any)[prop];
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
