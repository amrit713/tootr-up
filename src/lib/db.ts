import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/enums/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

// 3. Create the native driver client (Pool)
const pool = new Pool({ connectionString });

// 4. Create the Prisma adapter instance
const adapter = new PrismaPg(pool);

// 5. Implement the Singleton Pattern
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;