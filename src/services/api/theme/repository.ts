import { prisma } from '@/lib/prisma';
import { CreateThemeType, UpdateThemeType } from '@/types/theme';

export class ThemeRepository {
    static async CREATE(themeData: CreateThemeType) {
        const newTheme = await prisma.theme.create({
            data: {
                title: themeData.title,
            },
        });
        return newTheme;
    }

    static async GET() {
        const themes = await prisma.theme.findMany();

        return themes;
    }

    static async GET_ID(themeID: number) {
        const themeData = await prisma.theme.findUnique({
            where: {
                id: themeID,
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
        const deletedTheme = await prisma.theme.delete({
            where: {
                id: themeID,
            },
        });

        return deletedTheme;
    }
}
