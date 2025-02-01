-- DropForeignKey
ALTER TABLE "student_scores" DROP CONSTRAINT "student_scores_periodId_fkey";

-- DropForeignKey
ALTER TABLE "student_scores" DROP CONSTRAINT "student_scores_teacherId_fkey";

-- AlterTable
ALTER TABLE "student_scores" ALTER COLUMN "periodId" DROP NOT NULL,
ALTER COLUMN "teacherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "student_scores" ADD CONSTRAINT "student_scores_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_scores" ADD CONSTRAINT "student_scores_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
