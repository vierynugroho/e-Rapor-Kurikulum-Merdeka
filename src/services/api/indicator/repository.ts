import { prisma } from '@/lib/prisma';
import { CreateIndicatorType, UpdateIndicatorType } from '@/types/indicator';
import { CustomError } from '@/utils/error';
import { AssessmentAspects, ClassCategory } from '@prisma/client';

export class IndicatorRepository {
    static async CREATE(indicatorData: CreateIndicatorType) {
        const newIndicator = await prisma.indicator.create({
            data: {
                title: indicatorData.title,
                description: indicatorData.description,
                assesment_type: indicatorData.assesment_type,
                themeId: indicatorData.themeID || 1,
                classCategory: indicatorData.classCategory || ClassCategory.A,
            },
        });
        return newIndicator;
    }

    static async GET() {
        const indicators = await prisma.indicator.findMany({
            include: {
                Theme: true,
            },
            where: {
                Period: {
                    isActive: true,
                },
            },
        });

        return indicators;
    }

    static async GET_ID(indicatorID: number) {
        const indicatorData = await prisma.indicator.findUnique({
            where: {
                id: indicatorID,
                Period: {
                    isActive: true,
                },
            },
            include: {
                Theme: true,
            },
        });

        return indicatorData;
    }

    static async GET_BY_CLASS_CATEGORY(classCategory: ClassCategory) {
        const indicatorData = await prisma.indicator.findMany({
            where: {
                classCategory: classCategory,
                Period: {
                    isActive: true,
                },
            },
            include: {
                Theme: true,
            },
        });

        return indicatorData;
    }

    static async GET_BY_TYPE(indicatorType: AssessmentAspects) {
        const indicatorData = await prisma.indicator.findMany({
            where: {
                assesment_type: indicatorType,
                Period: {
                    isActive: true,
                },
            },
            include: {
                Theme: true,
            },
        });

        return indicatorData;
    }

    static async GET_IDENTITY(
        indicatorTitle: string,
        indicatorThemeID: number,
        classCategory: string,
    ) {
        const indicatorData = await prisma.indicator.findFirst({
            where: {
                title: {
                    mode: 'insensitive',
                    equals: indicatorTitle,
                },
                Period: {
                    isActive: true,
                },
                themeId: indicatorThemeID,
                classCategory: classCategory as ClassCategory,
            },
        });

        return indicatorData;
    }

    static async UPDATE(
        indicatorID: number,
        indicatorData: UpdateIndicatorType,
    ) {
        const updatedIndicator = await prisma.indicator.update({
            where: {
                id: indicatorID,
                Period: {
                    isActive: true,
                },
            },
            data: {
                title: indicatorData.title,
                description: indicatorData.description,
                assesment_type: indicatorData.assesment_type,
                themeId: indicatorData.themeID || 1,
                classCategory: indicatorData.classCategory || ClassCategory.A,
            },
        });

        return updatedIndicator;
    }

    static async DELETE(indicatorID: number) {
        // Gunakan transaction, cek apakah indicator ada pada penilaian (Student_Score)
        const deletedIndicator = await prisma.$transaction(async tx => {
            const isUsed = await tx.student_Score.findFirst({
                where: {
                    indicatorId: indicatorID,
                },
            });

            if (isUsed) {
                throw new CustomError(
                    400,
                    'Indicator cannot be deleted because it is already used in an assessment.',
                );
            }

            return tx.indicator.delete({
                where: {
                    id: indicatorID,
                },
            });
        });

        return deletedIndicator;
    }
}
