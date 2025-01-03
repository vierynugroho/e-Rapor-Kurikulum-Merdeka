/*
  Warnings:

  - Added the required column `teacherId` to the `student_scores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_scores" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "student_scores" ADD CONSTRAINT "student_scores_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
