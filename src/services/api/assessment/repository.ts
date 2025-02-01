import { prisma } from '@/lib/prisma';
import { DevelopmentLevel } from '@prisma/client';

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
        console.log('============= REPO ================');
        console.log(assessmentData);
        // {
        //   aspect: 'JATI_DIRI',
        //   description: '<p>sds</p>',
        //   assessments: [
        //     {
        //       studentId: 1,
        //       teacherId: 1,
        //       indicatorId: 1,
        //       periodId: 1,
        //       nilai: 'MB'
        //     }
        //   ]
        // }
        const assessment = await prisma.$transaction(async tx => {
            const existing = await tx.student_Score.findFirst({
                where: {
                    studentId: assessmentData.assessments.studentId,
                    indicatorId: assessmentData.assessments.indicatorId,
                    periodId: assessmentData.assessments.periodId,
                    teacherId: assessmentData.assessments.teacherId,
                },
            });

            if (existing) {
                return Promise.all(
                    assessmentData.assessments.map(async assessment => {
                        return tx.student_Score.update({
                            where: { id: existing.id },
                            data: {
                                value: assessment.nilai as DevelopmentLevel,
                                description: assessmentData.description,
                            },
                        });
                    }),
                );
            } else {
                return Promise.all(
                    assessmentData.assessments.map(async assessment => {
                        return tx.student_Score.create({
                            data: {
                                studentId: assessment.studentId,
                                indicatorId: assessment.indicatorId,
                                periodId: assessment.periodId,
                                teacherId: assessment.teacherId,
                                value: assessment.nilai as DevelopmentLevel,
                                description: assessmentData.description,
                            },
                        });
                    }),
                );
            }
        });
        return assessment;
    }
}
