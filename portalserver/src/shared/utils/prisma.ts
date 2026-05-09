import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { config } from "../../config";

const adapter = new PrismaPg({ connectionString: config.connectionString });
const prisma = new PrismaClient({ adapter, errorFormat: "minimal" });

export { prisma };
