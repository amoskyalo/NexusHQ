/*
  Warnings:

  - Added the required column `industry` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "industry" TEXT NOT NULL;
