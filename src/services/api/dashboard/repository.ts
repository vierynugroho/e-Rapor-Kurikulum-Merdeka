import { prisma } from '@/lib/prisma';
import { CustomError } from '@/utils/error';

export class DashboardRepository {
    static async GET(teacherID: number) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        const teacherClass = await prisma.teacher.findUnique({
            where: {
                id: teacherID,
            },
            include: {
                Class: true,
                _count: true,
            },
        });

        if (!teacherClass) {
            throw new CustomError(404, 'Teacher not found');
        }

        let students: number;
        if (teacherClass.role == 'TEACHER') {
            students = await prisma.student.count({
                where: {
                    classID: teacherClass.classID,
                },
            });
        } else {
            students = await prisma.student.count();
        }

        const teachers = await prisma.teacher.count();
        const indicators = await prisma.indicator.count();
        const themes = await prisma.theme.count();
        const classes = await prisma.class.count();

        const responseData = {
            totalStudent: students,
            totalTeacher: teachers,
            totalIndicator: indicators,
            totalThemes: themes,
            totalClass: classes,
            activePeriod: activePeriod,
            userData: teacherClass,
        };

        return responseData;
    }
}
