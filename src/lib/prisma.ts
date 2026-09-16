import { PrismaClient } from '@prisma/client';

import fs from 'fs';
import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  try {
    const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf-8');
    const match = envFile.match(/DATABASE_URL="?([^"\n]+)"?/);
    if (match) dbUrl = match[1];
  } catch (e) {
    console.error("Could not read .env file");
  }
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: { url: dbUrl },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
