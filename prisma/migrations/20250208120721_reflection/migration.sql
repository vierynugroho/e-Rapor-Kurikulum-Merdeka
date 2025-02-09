-- CreateTable
CREATE TABLE "reflections" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "periodId" INTEGER,
    "teacherId" INTEGER,
    "classId" INTEGER,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reflections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_reflection_studentId" ON "reflections"("studentId");

-- CreateIndex
CREATE INDEX "idx_reflection_periodId" ON "reflections"("periodId");

-- CreateIndex
CREATE INDEX "idx_reflection_composite" ON "reflections"("studentId", "periodId");

-- CreateIndex
CREATE UNIQUE INDEX "reflections_studentId_teacherId_periodId_classId_key" ON "reflections"("studentId", "teacherId", "periodId", "classId");

-- AddForeignKey
ALTER TABLE "reflections" ADD CONSTRAINT "reflections_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflections" ADD CONSTRAINT "reflections_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflections" ADD CONSTRAINT "reflections_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflections" ADD CONSTRAINT "reflections_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
