import { prisma } from '@/lib/prisma';
import { CreateTeacherType, UpdateTeacherType } from '@/types/teacher';
import { UserPosition } from '@prisma/client';

export class TeacherRepository {
    static async CREATE(teacherData: CreateTeacherType) {
        const teacher = await prisma.teacher.create({
            data: {
                fullname: teacherData.fullname,
                email: teacherData.email,
                identity_number: teacherData.identity_number,
                classID: teacherData.classID,
                password: teacherData.password,
                role: teacherData.role,
                position: teacherData.position,
            },
        });
        return teacher;
    }

    static async GET() {
        const teachers = await prisma.teacher.findMany({
            include: {
                Class: true,
            },
        });

        return teachers;
    }

    static async GET_ID(teacherID: number) {
        const teacher = await prisma.teacher.findUnique({
            where: {
                id: teacherID,
            },
        });

        return teacher;
    }

    static async GET_EMAIL(email: string) {
        const teacher = await prisma.teacher.findUnique({
            where: {
                email,
            },
        });

        return teacher;
    }

    static async GET_HEADMASTER() {
        const teacher = await prisma.teacher.findFirst({
            where: {
                position: UserPosition.HEADMASTER,
            },
        });

        return teacher;
    }

    static async GET_IDENTITY(identity_number: string) {
        const teacher = await prisma.teacher.findUnique({
            where: {
                identity_number,
            },
        });

        return teacher;
    }

    static async UPDATE(teacherID: number, teacherData: UpdateTeacherType) {
        const teacher = await prisma.teacher.update({
            where: {
                id: teacherID,
            },
            data: {
                fullname: teacherData.fullname,
                email: teacherData.email,
                identity_number: teacherData.identity_number,
                classID: teacherData.classID,
                password: teacherData.password,
                role: teacherData.role,
                position: teacherData.position,
            },
        });

        return teacher;
    }

    static async DELETE(teacherID: number) {
        const teacher = await prisma.teacher.delete({
            where: {
                id: teacherID,
            },
        });

        return teacher;
    }
}
