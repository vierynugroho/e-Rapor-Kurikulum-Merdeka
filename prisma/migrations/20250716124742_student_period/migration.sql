-- AlterTable
ALTER TABLE "students" ADD COLUMN     "classAndPeriod" JSONB,
ADD COLUMN     "currentPeriod" INTEGER;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_currentPeriod_fkey" FOREIGN KEY ("currentPeriod") REFERENCES "periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
