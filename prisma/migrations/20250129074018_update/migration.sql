/*
  Warnings:

  - Made the column `themeId` on table `indicators` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "indicators" DROP CONSTRAINT "indicators_themeId_fkey";

-- AlterTable
ALTER TABLE "indicators" ALTER COLUMN "themeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "indicators" ADD CONSTRAINT "indicators_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
