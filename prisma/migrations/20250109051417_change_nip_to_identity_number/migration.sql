/*
  Warnings:

  - You are about to drop the column `nip` on the `teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identity_number]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identity_number` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "teachers_nip_key";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "nip",
ADD COLUMN     "identity_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teachers_identity_number_key" ON "teachers"("identity_number");
