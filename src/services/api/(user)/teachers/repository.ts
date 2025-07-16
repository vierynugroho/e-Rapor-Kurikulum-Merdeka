import { prisma } from '@/lib/prisma';
import { CreateTeacherType, UpdateTeacherType } from '@/types/teacher';
import { UserPosition } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class TeacherRepository {
    static async CREATE(teacherData: CreateTeacherType) {
        const encryptedPassword = await bcrypt.hash(teacherData.password, 10);
        const teacher = await prisma.teacher.create({
            data: {
                fullname: teacherData.fullname,
                email: teacherData.email,
                identity_number: teacherData.identity_number,
                classID: teacherData.classID,
                password: encryptedPassword,
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
            include: {
                Class: true,
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
        console.log({ teacherData });
        const updatedData = {
            fullname: teacherData.fullname,
            email: teacherData.email!,
            identity_number: teacherData.identity_number,
            classID: teacherData.classID,
            role: teacherData.role,
            position: teacherData.position,
            password: teacherData.password,
        };

        if (teacherData.password) {
            const encryptedPassword = await bcrypt.hash(
                teacherData.password,
                10,
            );
            updatedData.password = encryptedPassword;
        }

        const teacher = await prisma.teacher.update({
            where: {
                id: teacherID,
            },
            data: updatedData,
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
