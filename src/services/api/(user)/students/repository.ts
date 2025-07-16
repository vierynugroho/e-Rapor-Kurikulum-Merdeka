import { prisma } from '@/lib/prisma';
import { CreateStudentType, UpdateStudentType } from '@/types/student';
import { CustomError } from '@/utils/error';
import { Gender } from '@prisma/client';

export class StudentRepository {
    static async CREATE(studentData: CreateStudentType) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        const student = await prisma.student.create({
            data: {
                fullname: studentData.fullname,
                currentPeriod: activePeriod?.id,
                classAndPeriod: [
                    {
                        classID: studentData.classID,
                        periodID: activePeriod?.id,
                    },
                ],
                gender: studentData.gender,
                religion: studentData.religion,
                parentName: studentData.parentName,
                birthPlace: studentData.birthPlace,
                birthDate: studentData.birthDate,
                classID: studentData.classID,
                address: studentData.address,
            },
        });

        return student;
    }

    static async GET() {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        const students = await prisma.student.findMany({
            where: {
                currentPeriod: activePeriod?.id,
            },
            include: {
                Class: true,
                Score: true,
                Development: true,
            },
        });

        return students;
    }

    static async GET_ID(studentID: number) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        const student = await prisma.student.findUnique({
            where: {
                id: studentID,
                currentPeriod: activePeriod?.id,
            },
        });

        return student;
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
                currentPeriod: activePeriod?.id,
            },
            orderBy: {
                fullname: 'asc',
            },
            include: {
                Reflection: {
                    where: {
                        periodId: activePeriod?.id,
                    },
                },
                Attendance: {
                    where: {
                        periodId: activePeriod?.id,
                    },
                },
                Class: {
                    select: {
                        name: true,
                        category: true,
                    },
                },
                Development: {
                    where: {
                        periodId: activePeriod?.id,
                    },
                    select: {
                        height: true,
                        weight: true,
                        notes: true,
                    },
                },
                Score: {
                    include: {
                        Indicator: {
                            select: {
                                title: true,
                                assesment_type: true,
                            },
                        },
                        Teacher: {
                            select: {
                                fullname: true,
                                identity_number: true,
                            },
                        },
                        Period: {
                            select: {
                                year: true,
                                semester: true,
                            },
                        },
                    },
                },
            },
        });

        if (!teacherClass || !teacherClass.classID) {
            throw new CustomError(404, 'Teacher or class not found');
        }

        const teacherClassCategory = await prisma.class.findFirst({
            where: {
                id: teacherClass.classID,
            },
            select: {
                category: true,
            },
        });
        const totalClassIndicator = await prisma.indicator.count({
            where: {
                classCategory: teacherClassCategory?.category,
            },
        });

        const enrichedStudents = await Promise.all(
            students.map(async student => {
                const studentScoreCount = await prisma.student_Score.count({
                    where: {
                        studentId: student.id,
                        periodId: activePeriod?.id,
                    },
                });

                const studentReflection = await prisma.reflection.findFirst({
                    where: {
                        studentId: student.id,
                        periodId: activePeriod?.id,
                    },
                });

                const studentAttendance = await prisma.attendance.findFirst({
                    where: {
                        studentId: student.id,
                        periodId: activePeriod?.id,
                    },
                });

                const hasReflection = studentReflection !== null;
                const hasAttendance = studentAttendance !== null;
                const hasDevelopment =
                    student.Development && student.Development.length > 0;
                const hasAllScores = studentScoreCount === totalClassIndicator;

                return {
                    ...student,
                    filledAssessment: hasAllScores,
                    teacherClass: teacherClass,
                    status: {
                        hasDevelopment,
                        hasAllScores,
                        hasReflection,
                        hasAttendance,
                    },
                    readyToPrint:
                        hasDevelopment &&
                        hasAllScores &&
                        hasReflection &&
                        hasAttendance,
                };
            }),
        );

        return enrichedStudents;
    }

    static async GET_IDENTITY(fullname: string) {
        const student = await prisma.student.findFirst({
            where: {
                fullname: {
                    mode: 'insensitive',
                    equals: fullname,
                },
            },
        });

        return student;
    }

    static async UPDATE(studentID: number, studentData: UpdateStudentType) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        // Ambil data student lama untuk cek perubahan classID
        const oldStudent = await prisma.student.findUnique({
            where: { id: studentID },
        });

        let newClassAndPeriod = oldStudent?.classAndPeriod ?? [];

        // Jika classID berubah, tambahkan entri baru ke classAndPeriod
        if (
            studentData.classID !== undefined &&
            studentData.classID !== oldStudent?.classID
        ) {
            // Pastikan newClassAndPeriod adalah array
            if (!Array.isArray(newClassAndPeriod)) {
                newClassAndPeriod = [];
            }
            newClassAndPeriod = [
                ...newClassAndPeriod,
                {
                    classID: studentData.classID,
                    periodID: activePeriod?.id,
                },
            ];
        }

        const student = await prisma.student.update({
            where: {
                id: studentID,
            },
            data: {
                fullname: studentData.fullname,
                currentPeriod: activePeriod?.id,
                classAndPeriod: newClassAndPeriod,
                gender: studentData.gender || Gender.LAKI_LAKI,
                religion: studentData.religion,
                parentName: studentData.parentName,
                birthPlace: studentData.birthPlace,
                birthDate: studentData.birthDate,
                classID: studentData.classID,
                address: studentData.address,
            },
        });

        return student;
    }

    static async DELETE(studentID: number) {
        // Hapus data berelasi menggunakan transaction agar lebih aman
        const deleted = await prisma.$transaction(async tx => {
            await tx.student_Score.deleteMany({
                where: { studentId: studentID },
            });
            await tx.student_Development.deleteMany({
                where: { studentId: studentID },
            });
            await tx.reflection.deleteMany({
                where: { studentId: studentID },
            });
            await tx.attendance.deleteMany({
                where: { studentId: studentID },
            });

            const student = await tx.student.delete({
                where: {
                    id: studentID,
                },
            });

            return student;
        });

        return deleted;
    }
}
