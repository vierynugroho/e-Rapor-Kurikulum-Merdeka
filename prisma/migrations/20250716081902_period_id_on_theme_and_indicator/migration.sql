-- AlterTable
ALTER TABLE "indicators" ADD COLUMN     "periodId" INTEGER;

-- AlterTable
ALTER TABLE "themes" ADD COLUMN     "periodId" INTEGER;

-- CreateIndex
CREATE INDEX "idx_attendance_teacherId" ON "attendances"("teacherId");

-- CreateIndex
CREATE INDEX "idx_attendance_classId" ON "attendances"("classId");

-- CreateIndex
CREATE INDEX "idx_class_name" ON "class"("name");

-- CreateIndex
CREATE INDEX "idx_class_category" ON "class"("category");

-- CreateIndex
CREATE INDEX "idx_indicator_themeId" ON "indicators"("themeId");

-- CreateIndex
CREATE INDEX "idx_indicator_assessmentType" ON "indicators"("assesment_type");

-- CreateIndex
CREATE INDEX "idx_indicator_classCategory" ON "indicators"("classCategory");

-- CreateIndex
CREATE INDEX "idx_period_isActive" ON "periods"("isActive");

-- CreateIndex
CREATE INDEX "idx_period_semester_year" ON "periods"("semester", "year");

-- CreateIndex
CREATE INDEX "idx_reflection_teacherId" ON "reflections"("teacherId");

-- CreateIndex
CREATE INDEX "idx_reflection_classId" ON "reflections"("classId");

-- CreateIndex
CREATE INDEX "idx_development_studentId" ON "student_developments"("studentId");

-- CreateIndex
CREATE INDEX "idx_development_teacherId" ON "student_developments"("teacherId");

-- CreateIndex
CREATE INDEX "idx_development_periodId" ON "student_developments"("periodId");

-- CreateIndex
CREATE INDEX "idx_development_recordDate" ON "student_developments"("record_date");

-- CreateIndex
CREATE INDEX "idx_development_student_period" ON "student_developments"("studentId", "periodId");

-- CreateIndex
CREATE INDEX "idx_score_teacherId" ON "student_scores"("teacherId");

-- CreateIndex
CREATE INDEX "idx_score_value" ON "student_scores"("value");

-- CreateIndex
CREATE INDEX "idx_student_fullname" ON "students"("fullname");

-- CreateIndex
CREATE INDEX "idx_student_classId" ON "students"("class_id");

-- CreateIndex
CREATE INDEX "idx_student_gender" ON "students"("gender");

-- CreateIndex
CREATE INDEX "idx_student_religion" ON "students"("religion");

-- CreateIndex
CREATE INDEX "idx_teacher_classId" ON "teachers"("class_id");

-- CreateIndex
CREATE INDEX "idx_theme_title" ON "themes"("title");

-- AddForeignKey
ALTER TABLE "themes" ADD CONSTRAINT "themes_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicators" ADD CONSTRAINT "indicators_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
