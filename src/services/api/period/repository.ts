import { prisma } from '@/lib/prisma';
import { CreatePeriodType, UpdatePeriodType } from '@/types/period';
import { Semester } from '@prisma/client';

export class PeriodRepository {
    static async CREATE(periodData: CreatePeriodType) {
        if (periodData.isActive === true) {
            await prisma.period.updateMany({
                where: {
                    isActive: true,
                },
                data: {
                    isActive: false,
                },
            });
        }

        const newPeriod = await prisma.period.create({
            data: {
                year: periodData.year,
                semester: periodData.semester,
                isActive: periodData.isActive,
            },
        });
        return newPeriod;
    }

    static async GET() {
        const periods = await prisma.period.findMany();

        return periods;
    }

    static async GET_ID(periodID: number) {
        const periodData = await prisma.period.findUnique({
            where: {
                id: periodID,
            },
        });

        return periodData;
    }

    static async GET_ACTIVE_PERIOD() {
        const periodData = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        return periodData;
    }

    static async GET_IDENTITY(year: string, semester: Semester) {
        const periodData = await prisma.period.findFirst({
            where: {
                AND: [{ year, semester }],
            },
        });

        return periodData;
    }

    static async UPDATE(periodID: number, periodData: UpdatePeriodType) {
        if (periodData.isActive === true) {
            await prisma.period.updateMany({
                where: {
                    id: {
                        not: periodID,
                    },
                },
                data: {
                    isActive: false,
                },
            });
        }

        const updatedPeriod = await prisma.period.update({
            where: {
                id: periodID,
            },
            data: {
                year: periodData.year,
                semester: periodData.semester,
                isActive: periodData.isActive,
            },
        });

        return updatedPeriod;
    }

    static async DELETE(periodID: number) {
        const deletedPeriod = await prisma.period.delete({
            where: {
                id: periodID,
            },
        });

        return deletedPeriod;
    }
}
