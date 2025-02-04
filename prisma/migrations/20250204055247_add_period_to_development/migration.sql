/*
  Warnings:

  - Added the required column `periodId` to the `student_developments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_developments" ADD COLUMN     "periodId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "student_developments" ADD CONSTRAINT "student_developments_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
