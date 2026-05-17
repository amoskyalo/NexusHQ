/*
  Warnings:

  - You are about to drop the column `organizations` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MODULES" AS ENUM ('HR', 'FINANCE', 'TECH', 'AGILE');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "organizations";

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "modules" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
