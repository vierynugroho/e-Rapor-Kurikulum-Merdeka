import { prisma } from '@/lib/prisma';
import { CreateThemeType, UpdateThemeType } from '@/types/theme';
import { CustomError } from '@/utils/error';

export class ThemeRepository {
    static async CREATE(themeData: CreateThemeType) {
        const activePeriod = await prisma.period.findFirst({
            where: {
                isActive: true,
            },
        });

        const newTheme = await prisma.theme.create({
            data: {
                title: themeData.title,
                periodId: activePeriod?.id,
            },
        });
        return newTheme;
    }

    static async GET() {
        const themes = await prisma.theme.findMany({
            where: {
                Period: {
                    isActive: true,
                },
            },
        });

        return themes;
    }

    static async GET_ID(themeID: number) {
        const themeData = await prisma.theme.findUnique({
            where: {
                id: themeID,
                Period: {
                    isActive: true,
                },
            },
        });

        return themeData;
    }

    static async GET_IDENTITY(theme_title: string) {
        const themeData = await prisma.theme.findFirst({
            where: {
                title: {
                    mode: 'insensitive',
                    equals: theme_title,
                },
                Period: {
                    isActive: true,
                },
            },
        });

        return themeData;
    }

    static async UPDATE(themeID: number, themeData: UpdateThemeType) {
        const updatedTheme = await prisma.theme.update({
            where: {
                id: themeID,
            },
            data: {
                title: themeData.title,
            },
        });

        return updatedTheme;
    }

    static async DELETE(themeID: number) {
        const isUsed = await prisma.indicator.findFirst({
            where: {
                themeId: themeID,
            },
        });

        if (isUsed) {
            throw new CustomError(
                400,
                'Theme cannot be deleted because it is already used in an indicator.',
            );
        }

        const deletedTheme = await prisma.$transaction(async tx => {
            await tx.indicator.deleteMany({
                where: {
                    themeId: themeID,
                },
            });

            // Delete the theme itself
            return tx.theme.delete({
                where: {
                    id: themeID,
                },
            });
        });

        return deletedTheme;
    }
}
