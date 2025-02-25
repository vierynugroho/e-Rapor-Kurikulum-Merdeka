import { prisma } from '@/lib/prisma';
import { StudentAttendanceType } from '@/types/student';
import { CustomError } from '@/utils/error';

export class StudentAttendanceRepository {
    static async UPSERT(studentAttendanceData: StudentAttendanceType) {
        try {
            const activePeriod = await prisma.period.findFirst({
                where: { isActive: true },
            });

            if (!activePeriod) {
                throw new Error('No active period found');
            }

            const attendances = await prisma.$transaction(async tx => {
                const existing = await tx.attendance.findFirst({
                    where: {
                        periodId: activePeriod?.id,
                        studentId: studentAttendanceData.studentID,
                    },
                });

                let result;

                if (existing) {
                    result = await tx.attendance.update({
                        where: { id: existing.id },
                        data: {
                            permit: studentAttendanceData?.permit || 0,
                            absent: studentAttendanceData?.absent || 0,
                            sick: studentAttendanceData?.sick || 0,
                            studentId: studentAttendanceData.studentID,
                            teacherId: studentAttendanceData.teacherID,
                            periodId: activePeriod.id,
                        },
                    });
                } else {
                    result = await tx.attendance.create({
                        data: {
                            permit: studentAttendanceData?.permit || 0,
                            absent: studentAttendanceData?.absent || 0,
                            sick: studentAttendanceData?.sick || 0,
                            studentId: studentAttendanceData.studentID!,
                            teacherId: studentAttendanceData.techerID!,
                            periodId: activePeriod.id,
                        },
                    });
                }

                return result;
            });

            return attendances;
        } catch (error) {
            console.error('Error in UPSERT attendances:', error);
            throw error;
        }
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
                const studentAttendanceData = await prisma.attendance.findFirst(
                    {
                        where: {
                            studentId: student.id,
                            periodId: activePeriod?.id,
                        },
                    },
                );

                const hasAttendance = studentAttendanceData !== null;

                return {
                    ...student,
                    attendance: studentAttendanceData,
                    teacherClass: teacherClass,
                    hasAttendance,
                };
            }),
        );

        return enrichedStudents;
    }
}
