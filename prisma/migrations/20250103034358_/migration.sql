/*
  Warnings:

  - Added the required column `teacherId` to the `student_developments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_developments" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "student_developments" ADD CONSTRAINT "student_developments_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
