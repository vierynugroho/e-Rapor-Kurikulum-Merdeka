/*
  Warnings:

  - Added the required column `category` to the `class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classCategory` to the `indicators` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClassCategory" AS ENUM ('A', 'B');

-- AlterTable
ALTER TABLE "class" ADD COLUMN     "category" "ClassCategory" NOT NULL;

-- AlterTable
ALTER TABLE "indicators" ADD COLUMN     "classCategory" "ClassCategory" NOT NULL;
