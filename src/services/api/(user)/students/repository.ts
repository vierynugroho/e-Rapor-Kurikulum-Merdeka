import { prisma } from '@/lib/prisma';
import { CreateStudentType, UpdateStudentType } from '@/types/student';
import { CustomError } from '@/utils/error';
import { Gender } from '@prisma/client';

export class StudentRepository {
    static async CREATE(studentData: CreateStudentType) {
        const student = await prisma.student.create({
            data: {
                fullname: studentData.fullname,
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
        const students = await prisma.student.findMany({
            include: {
                Class: true,
                Score: true,
                Development: true,
            },
        });

        return students;
    }

    static async GET_ID(studentID: number) {
        const student = await prisma.student.findUnique({
            where: {
                id: studentID,
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

                const hasReflection = studentReflection !== null;
                const hasDevelopment =
                    student.Development && student.Development.length > 0;
                const hasAllScores = studentScoreCount === totalClassIndicator;

                return {
                    ...student,
                    filledAssessment: hasAllScores,
                    teacherClass: teacherClass,
                    readyToPrint:
                        hasDevelopment && hasAllScores && hasReflection,
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
        const student = await prisma.student.update({
            where: {
                id: studentID,
            },
            data: {
                fullname: studentData.fullname,
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
        const student = await prisma.student.delete({
            where: {
                id: studentID,
            },
        });

        return student;
    }
}
