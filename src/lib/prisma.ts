import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Lazy singleton. Only constructed when DATABASE_URL exists (the waitlist action
// guards on that), so local dev without a DB never tries to connect.
export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    const client = new PrismaClient({ adapter });
    globalForPrisma.prisma = client;
  }
  return globalForPrisma.prisma;
}
