/*
  Warnings:

  - A unique constraint covering the columns `[studentId,teacherId,periodId,indicatorId]` on the table `student_scores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "student_scores_studentId_teacherId_periodId_indicatorId_key" ON "student_scores"("studentId", "teacherId", "periodId", "indicatorId");
