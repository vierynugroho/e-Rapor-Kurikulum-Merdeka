/*
  Warnings:

  - You are about to drop the column `name` on the `periods` table. All the data in the column will be lost.
  - You are about to drop the column `criteriaId` on the `student_scores` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `criterias` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `semester` to the `periods` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `value` on the `student_scores` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `birth_date` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_place` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DevelopmentLevel" AS ENUM ('BB', 'MB', 'BSH', 'BSB');

-- DropForeignKey
ALTER TABLE "criterias" DROP CONSTRAINT "criterias_themeId_fkey";

-- DropForeignKey
ALTER TABLE "student_scores" DROP CONSTRAINT "student_scores_criteriaId_fkey";

-- DropIndex
DROP INDEX "idx_composite";

-- DropIndex
DROP INDEX "idx_criteriaId";

-- AlterTable
ALTER TABLE "periods" DROP COLUMN "name",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "semester" "Semester" NOT NULL;

-- AlterTable
ALTER TABLE "student_scores" DROP COLUMN "criteriaId",
ADD COLUMN     "indicatorId" INTEGER,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" "DevelopmentLevel" NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "date_of_birth",
DROP COLUMN "height",
DROP COLUMN "weight",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "birth_place" TEXT NOT NULL,
ADD COLUMN     "parent_name" TEXT,
ADD COLUMN     "religion" TEXT;

-- DropTable
DROP TABLE "criterias";

-- DropEnum
DROP TYPE "Nilai";

-- CreateTable
CREATE TABLE "indicators" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assesment_type" "AssessmentAspects" NOT NULL,
    "themeId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_developments" (
    "id" SERIAL NOT NULL,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "notes" TEXT,
    "studentId" INTEGER NOT NULL,
    "record_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_developments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_indicatorId" ON "student_scores"("indicatorId");

-- CreateIndex
CREATE INDEX "idx_composite" ON "student_scores"("studentId", "indicatorId", "periodId");

-- AddForeignKey
ALTER TABLE "indicators" ADD CONSTRAINT "indicators_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_scores" ADD CONSTRAINT "student_scores_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "indicators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_developments" ADD CONSTRAINT "student_developments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
