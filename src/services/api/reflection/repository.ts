import { prisma } from '@/lib/prisma';
import { ReflectionType } from '@/types/student';
import { CustomError } from '@/utils/error';

export class ReflectionRepository {
    static async GET() {
        const reflections = await prisma.reflection.findMany();

        return reflections;
    }

    static async GET_ID(reflectionID: number) {
        const reflectionData = await prisma.reflection.findUnique({
            where: {
                id: reflectionID,
            },
        });

        return reflectionData;
    }

    static async GET_BY_CLASS_AND_ACTIVE_PERIOD(teacherId: number) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        if (!activePeriod) {
            throw new CustomError(404, 'all period is non-active');
        }

        const teacher = await prisma.teacher.findFirst({
            where: {
                id: teacherId,
            },
            select: {
                classID: true,
            },
        });

        if (!teacher) {
            throw new CustomError(404, 'teacher data is not found');
        }

        if (!teacher.classID) {
            throw new CustomError(404, "teacher doesn't have a class");
        }

        const students = await prisma.student.findMany({
            where: {
                classID: teacher.classID,
            },
            include: {
                Reflection: {
                    where: {
                        periodId: activePeriod.id,
                    },
                    select: {
                        id: true,
                        description: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });

        const studentsWithStatus = students.map(student => {
            const hasReflection =
                student.Reflection && student.Reflection.length > 0;
            const reflection = hasReflection ? student.Reflection[0] : null;
            console.log('REFLECTION');
            console.log(reflection);
            return {
                ...student,
                periodId: activePeriod.id,
                teacherId: teacher.classID,
                filledReflection: hasReflection,
                reflection: reflection
                    ? {
                          id: reflection.id,
                          description: reflection.description,
                          createdAt: reflection.createdAt,
                          updatedAt: reflection.updatedAt,
                      }
                    : null,
            };
        });

        return studentsWithStatus;
    }

    static async GET_IDENTITY(periodId: number, studentId: number) {
        const reflectionData = await prisma.reflection.findFirst({
            where: {
                AND: [{ periodId, studentId }],
            },
        });

        return reflectionData;
    }

    static async UPSERT(reflectionData: ReflectionType) {
        try {
            const activePeriod = await prisma.period.findFirst({
                where: { isActive: true },
            });

            if (!activePeriod) {
                throw new Error('No active period found');
            }

            const reflection = await prisma.$transaction(async tx => {
                const existing = await tx.reflection.findFirst({
                    where: {
                        periodId: reflectionData.periodId,
                        classId: reflectionData.classId,
                        studentId: reflectionData.studentId,
                        teacherId: reflectionData.teacherId,
                    },
                });

                let result: {
                    id: number;
                    studentId: number;
                    periodId: number | null;
                    teacherId: number | null;
                    classId: number | null;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                };

                if (existing) {
                    result = await tx.reflection.update({
                        where: { id: existing.id },
                        data: {
                            description: reflectionData.description,
                            updatedAt: new Date(),
                        },
                    });
                } else {
                    result = await tx.reflection.create({
                        data: {
                            description: reflectionData.description || '',
                            periodId: reflectionData.periodId!,
                            classId: reflectionData.classId!,
                            studentId: reflectionData.studentId!,
                            teacherId: reflectionData.teacherId!,
                        },
                    });
                }

                const hasFilledReflection = await tx.reflection.findFirst({
                    where: {
                        AND: [
                            { periodId: activePeriod.id },
                            { studentId: reflectionData.studentId },
                            { description: { not: '' } }, // Optional: ensure description is not empty
                        ],
                    },
                });

                return {
                    ...result,
                    filledReflection: !!hasFilledReflection,
                };
            });

            return reflection;
        } catch (error) {
            console.error('Error in UPSERT reflection:', error);
            throw error;
        }
    }
}
