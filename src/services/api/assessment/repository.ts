import { prisma } from '@/lib/prisma';

export class AssessmentRepository {
    static async GET_ID(assessmentID: number) {
        const assessmentData = await prisma.student_Score.findUnique({
            where: {
                id: assessmentID,
            },
        });

        return assessmentData;
    }

    static async UPSERT(assessmentData) {
        const assessment = await prisma.$transaction(async tx => {
            const existing = await tx.student_Score.findFirst({
                where: {
                    studentId: assessmentData.studentId,
                    indicatorId: assessmentData.indicatorId,
                    periodId: assessmentData.periodId,
                    teacherId: assessmentData.teacherId,
                },
            });

            if (existing) {
                return tx.student_Score.update({
                    where: { id: existing.id }, // assuming you have an id field
                    data: {
                        value: assessmentData.value,
                        description: assessmentData.description,
                    },
                });
            } else {
                return tx.student_Score.create({
                    data: {
                        studentId: assessmentData.studentId,
                        indicatorId: assessmentData.indicatorId,
                        periodId: assessmentData.periodId,
                        teacherId: assessmentData.teacherId,
                        value: assessmentData.value,
                        description: assessmentData.description,
                    },
                });
            }
        });
        return assessment;
    }
}
