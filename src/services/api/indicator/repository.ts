import { prisma } from '@/lib/prisma';
import { CreateIndicatorType, UpdateIndicatorType } from '@/types/indicator';
import { AssessmentAspects } from '@prisma/client';

export class IndicatorRepository {
    static async CREATE(indicatorData: CreateIndicatorType) {
        const newIndicator = await prisma.indicator.create({
            data: {
                title: indicatorData.title,
                description: indicatorData.description,
                assesment_type: indicatorData.assesment_type,
                themeId: indicatorData.themeID || 1,
            },
        });
        return newIndicator;
    }

    static async GET() {
        const indicators = await prisma.indicator.findMany({
            include: {
                Theme: true,
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
                Theme: true,
            },
        });

        return indicatorData;
    }

    static async GET_BY_TYPE(indicatorType: AssessmentAspects) {
        const indicatorData = await prisma.indicator.findMany({
            where: {
                assesment_type: indicatorType,
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
                themeId: indicatorData.themeID || 1,
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
