import { prisma } from '@/lib/prisma';
import { CreateClassType, UpdateClassType } from '@/types/class';
import { ClassCategory } from '@prisma/client';

export class ClassRepository {
    static async CREATE(classData: CreateClassType) {
        const newClass = await prisma.class.create({
            data: {
                name: classData.name,
                category: classData.category,
            },
        });
        return newClass;
    }

    static async GET() {
        const classes = await prisma.class.findMany();

        return classes;
    }

    static async GET_ID(classID: number) {
        const classData = await prisma.class.findUnique({
            where: {
                id: classID,
            },
        });

        return classData;
    }

    static async GET_IDENTITY(
        class_name: string,
        classCategory: ClassCategory,
    ) {
        const classData = await prisma.class.findFirst({
            where: {
                AND: [
                    { name: { mode: 'insensitive', equals: class_name } },
                    { category: classCategory },
                ],
            },
        });

        return classData;
    }

    static async UPDATE(classID: number, classData: UpdateClassType) {
        const updatedClass = await prisma.class.update({
            where: {
                id: classID,
            },
            data: {
                name: classData.name,
                category: classData.category,
            },
        });

        return updatedClass;
    }

    static async DELETE(classID: number) {
        const deletedClass = await prisma.class.delete({
            where: {
                id: classID,
            },
        });

        return deletedClass;
    }
}
