import { PrismaClient } from "@prisma/client";

const globalForPrimsa = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = 
  globalForPrimsa.prisma ??
  new PrismaClient({
    log: ["query"],
  })

  if (process.env.NODE_ENV !== "production") globalForPrimsa.prisma = prisma