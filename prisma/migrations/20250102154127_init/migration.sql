-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Nilai" AS ENUM ('SANGAT_BAIK', 'BAIK', 'CUKUP', 'KURANG');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('GANJIL', 'GENAP');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "AssessmentAspects" AS ENUM ('NILAI_AGAMA_DAN_BUDI_PEKERTI', 'JATI_DIRI', 'DASAR_LITERASI_MATEMATIKA_SAINS_TEKNOLOGI_REKAYASA_DAN_SENI');

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "class_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periods" (
    "id" SERIAL NOT NULL,
    "name" "Semester" NOT NULL,
    "year" TEXT NOT NULL DEFAULT '2025',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "gender" "Gender" NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "class_id" INTEGER,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "themes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criterias" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assesment_type" "AssessmentAspects" NOT NULL,
    "themeId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criterias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_scores" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "value" "Nilai" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "teachers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_nip_key" ON "teachers"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "class_name_key" ON "class"("name");

-- CreateIndex
CREATE INDEX "idx_studentId" ON "student_scores"("studentId");

-- CreateIndex
CREATE INDEX "idx_criteriaId" ON "student_scores"("criteriaId");

-- CreateIndex
CREATE INDEX "idx_periodId" ON "student_scores"("periodId");

-- CreateIndex
CREATE INDEX "idx_composite" ON "student_scores"("studentId", "criteriaId", "periodId");

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criterias" ADD CONSTRAINT "criterias_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_scores" ADD CONSTRAINT "student_scores_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_scores" ADD CONSTRAINT "student_scores_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "criterias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_scores" ADD CONSTRAINT "student_scores_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
