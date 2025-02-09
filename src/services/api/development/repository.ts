import { prisma } from '@/lib/prisma';
import {
    CreateStudentDevelopment,
    UpdateStudentDevelopment,
} from '@/types/student';
import { CustomError } from '@/utils/error';

export class StudentDevelopmentRepository {
    static async CREATE(studentDevelopmentData: CreateStudentDevelopment) {
        try {
            const activePeriod = await prisma.period.findFirst({
                where: { isActive: true },
            });

            if (!activePeriod) {
                throw new Error('No active period found');
            }

            const reflection = await prisma.$transaction(async tx => {
                const existing = await tx.student_Development.findFirst({
                    where: {
                        periodId: activePeriod?.id,
                        studentId: studentDevelopmentData.studentID,
                    },
                });

                let result;

                if (existing) {
                    result = await tx.student_Development.update({
                        where: { id: existing.id },
                        data: {
                            notes: studentDevelopmentData.notes,
                            height: studentDevelopmentData.height,
                            weight: studentDevelopmentData.weight,
                            periodId: activePeriod?.id,
                            studentId: studentDevelopmentData.studentID,
                            teacherId: studentDevelopmentData.teacherID,
                            recordDate: new Date(),
                            updatedAt: new Date(),
                        },
                    });
                } else {
                    result = await tx.student_Development.create({
                        data: {
                            notes: studentDevelopmentData.notes ?? null,
                            height: studentDevelopmentData.height ?? null,
                            weight: studentDevelopmentData.weight ?? null,
                            periodId: activePeriod?.id,
                            studentId: studentDevelopmentData.studentID!,
                            teacherId: studentDevelopmentData.teacherID!,
                            recordDate: new Date(),
                        },
                    });
                }

                return result;
            });

            return reflection;
        } catch (error) {
            console.error('Error in UPSERT reflection:', error);
            throw error;
        }
    }

    static async GET() {
        const studentDevelopments = await prisma.student_Development.findMany({
            include: {
                Student: true,
                Teacher: true,
            },
        });

        return studentDevelopments;
    }

    static async GET_ID(studentDevelopmentID: number) {
        const studentDevelopmentData =
            await prisma.student_Development.findUnique({
                where: {
                    id: studentDevelopmentID,
                },
            });

        return studentDevelopmentData;
    }

    static async GET_BY_CLASS(teacherID: number) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        const teacherClass = await prisma.teacher.findUnique({
            where: {
                id: teacherID,
            },
            select: {
                fullname: true,
                identity_number: true,
                classID: true,
            },
        });

        if (!teacherClass) {
            throw new CustomError(404, 'Teacher not found');
        }

        const students = await prisma.student.findMany({
            where: {
                classID: teacherClass.classID,
            },
            orderBy: {
                fullname: 'asc',
            },
            include: {
                Class: {
                    select: {
                        name: true,
                        category: true,
                    },
                },
            },
        });

        if (!teacherClass || !teacherClass.classID) {
            throw new CustomError(404, 'Teacher or class not found');
        }

        const enrichedStudents = await Promise.all(
            students.map(async student => {
                const studentDevelopmentData =
                    await prisma.student_Development.findFirst({
                        where: {
                            studentId: student.id,
                            periodId: activePeriod?.id,
                        },
                    });

                const hasDevelopment = studentDevelopmentData !== null;

                return {
                    ...student,
                    development: studentDevelopmentData,
                    teacherClass: teacherClass,
                    hasDevelopment,
                };
            }),
        );

        return enrichedStudents;
    }

    static async GET_IDENTITY(studentID: number) {
        const studentDevelopmentData =
            await prisma.student_Development.findFirst({
                where: {
                    studentId: studentID,
                },
            });

        return studentDevelopmentData;
    }

    static async UPDATE(
        studentDevelopmentID: number,
        studentDevelopmentData: UpdateStudentDevelopment,
    ) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        const updatedPeriod = await prisma.student_Development.update({
            where: {
                id: studentDevelopmentID,
            },
            data: {
                notes: studentDevelopmentData.notes,
                height: studentDevelopmentData.height,
                weight: studentDevelopmentData.weight,
                periodId: activePeriod?.id,
                studentId: studentDevelopmentData.studentID,
                teacherId: studentDevelopmentData.teacherID,
                recordDate: new Date(),
            },
        });

        return updatedPeriod;
    }

    static async DELETE(studentDevelopmentID: number) {
        const deletedPeriod = await prisma.student_Development.delete({
            where: {
                id: studentDevelopmentID,
            },
        });

        return deletedPeriod;
    }
}
