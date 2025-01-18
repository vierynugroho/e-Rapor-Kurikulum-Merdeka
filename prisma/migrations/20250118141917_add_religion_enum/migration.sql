/*
  Warnings:

  - Added the required column `religion` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'KRISTEN', 'KATOLIK', 'KONGHUCU', 'BUDDHA', 'HINDU');

-- AlterTable
ALTER TABLE "students" DROP COLUMN "religion",
ADD COLUMN     "religion" "Religion" NOT NULL;
