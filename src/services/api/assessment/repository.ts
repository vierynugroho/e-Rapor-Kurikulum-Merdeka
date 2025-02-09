import { prisma } from '@/lib/prisma';

export class AssessmentRepository {
    static async GET_BY_STUDENT(studentID: number) {
        const assessmentData = await prisma.student_Score.findMany({
            where: {
                studentId: studentID,
            },
        });

        return assessmentData;
    }

    static async UPSERT(assessmentData) {
        const { assessments, description } = assessmentData;

        // Validate input data
        if (!Array.isArray(assessments) || assessments.length === 0) {
            throw new Error('Assessments must be a non-empty array');
        }

        const assessment = await prisma.$transaction(async tx => {
            // Process each assessment in parallel
            return Promise.all(
                assessments.map(async assessment => {
                    const existing = await tx.student_Score.findFirst({
                        where: {
                            studentId: assessment.studentId,
                            indicatorId: assessment.indicatorId,
                            periodId: assessment.periodId,
                            teacherId: assessment.teacherId,
                        },
                    });

                    if (existing) {
                        // Update existing record
                        return tx.student_Score.update({
                            where: { id: existing.id },
                            data: {
                                value: assessment.value,
                                description: description,
                            },
                        });
                    } else {
                        // Create new record
                        return tx.student_Score.create({
                            data: {
                                studentId: assessment.studentId,
                                teacherId: assessment.teacherId,
                                indicatorId: assessment.indicatorId,
                                periodId: assessment.periodId,
                                value: assessment.value,
                                description: description,
                            },
                        });
                    }
                }),
            );
        });

        return assessment;
    }
}
