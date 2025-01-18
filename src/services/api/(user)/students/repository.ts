import { prisma } from '@/lib/prisma';
import { CreateStudentType, UpdateStudentType } from '@/types/student';
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
                class: true,
                Student_Score: true,
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
