import { prisma } from '@/lib/prisma';
import { CreateIndicatorType, UpdateIndicatorType } from '@/types/indicator';

export class IndicatorRepository {
    static async CREATE(indicatorData: CreateIndicatorType) {
        const newIndicator = await prisma.indicator.create({
            data: {
                title: indicatorData.title,
                description: indicatorData.description,
                assesment_type: indicatorData.assesment_type,
                themeId: indicatorData.themeID,
            },
        });
        return newIndicator;
    }

    static async GET() {
        const indicators = await prisma.indicator.findMany({
            include: {
                theme: true,
            },
        });

        return indicators;
    }

    static async GET_ID(indicatorID: number) {
        const indicatorData = await prisma.indicator.findUnique({
            where: {
                id: indicatorID,
            },
            include: {
                theme: true,
            },
        });

        return indicatorData;
    }

    static async GET_IDENTITY(
        indicatorTitle: string,
        indicatorThemeID: number,
    ) {
        const indicatorData = await prisma.indicator.findFirst({
            where: {
                title: {
                    mode: 'insensitive',
                    equals: indicatorTitle,
                },
                themeId: indicatorThemeID,
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
            },
            data: {
                title: indicatorData.title,
                description: indicatorData.description,
                assesment_type: indicatorData.assesment_type,
                themeId: indicatorData.themeID,
            },
        });

        return updatedIndicator;
    }

    static async DELETE(indicatorID: number) {
        const deletedIndicator = await prisma.indicator.delete({
            where: {
                id: indicatorID,
            },
        });

        return deletedIndicator;
    }
}
