import { prisma } from '@/lib/prisma';
import { Teacher } from '@/types/user-type';

export class TeacherRepository {
    static async CREATE(teacherData: Teacher) {
        const teacher = await prisma.teacher.create({
            data: {
                fullname: teacherData.fullname,
                email: teacherData.email,
                nip: teacherData.nip,
                classID: teacherData.classID,
                password: teacherData.password,
                role: teacherData.role,
            },
        });
        return teacher;
    }
}
