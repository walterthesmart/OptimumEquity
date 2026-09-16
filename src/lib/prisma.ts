import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
    datasources: {
      // Prisma will automatically read process.env.DATABASE_URL
      // If it's missing, it will use the generated default.
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
