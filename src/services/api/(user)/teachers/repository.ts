import { prisma } from '@/lib/prisma';
import { TeacherType } from '@/types/user-type';

export class TeacherRepository {
    static async CREATE(teacherData: TeacherType) {
        const teacher = await prisma.teacher.create({
            data: {
                fullname: teacherData.fullname,
                email: teacherData.email,
                identity_number: teacherData.identity_number,
                classID: teacherData.classID,
                password: teacherData.password,
                role: teacherData.role,
            },
        });
        return teacher;
    }

    static async GET() {
        const teachers = await prisma.teacher.findMany({
            include: {
                class: true,
            },
        });

        return teachers;
    }

    static async GET_EMAIL(email: string) {
        const teacher = await prisma.teacher.findUnique({
            where: {
                email,
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
}
