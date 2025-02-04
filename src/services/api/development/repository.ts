import { prisma } from '@/lib/prisma';
import {
    CreateStudentDevelopment,
    UpdateStudentDevelopment,
} from '@/types/student';

export class StudentDevelopmentRepository {
    static async CREATE(studentDevelopmentData: CreateStudentDevelopment) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        const newStudentData = await prisma.student_Development.create({
            data: {
                notes: studentDevelopmentData.notes,
                height: studentDevelopmentData.height,
                weight: studentDevelopmentData.weight,
                studentId: studentDevelopmentData.studentID,
                teacherId: studentDevelopmentData.teacherID,
                recordDate: new Date(),
                periodId: activePeriod?.id,
            },
        });
        return newStudentData;
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
