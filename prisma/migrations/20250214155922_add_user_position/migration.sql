/*
  Warnings:

  - Added the required column `position` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserPosition" AS ENUM ('TEACHER', 'HEADMASTER', 'COMMITTEE');

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "position" "UserPosition" NOT NULL;
