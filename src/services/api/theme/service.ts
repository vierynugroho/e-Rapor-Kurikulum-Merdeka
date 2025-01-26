import { CustomError } from '@/utils/error';
import { Theme } from '@prisma/client';
import { ThemeRepository } from './repository';
import { CreateThemeType, UpdateThemeType } from '@/types/theme';

export class ThemeService {
    static async GET(): Promise<Partial<Theme>[]> {
        const classes = await ThemeRepository.GET();
        return classes;
    }

    static async GET_ID(classID: number): Promise<Partial<Theme | null>> {
        const classData = await ThemeRepository.GET_ID(classID);

        return classData;
    }

    static async CREATE<T extends CreateThemeType>(request: T) {
        const identityExist = await ThemeRepository.GET_IDENTITY(request.title);

        if (identityExist) {
            throw new CustomError(400, 'this theme is already registered');
        }

        const newClass = await ThemeRepository.CREATE(request);

        return newClass;
    }

    static async UPDATE<T extends Partial<UpdateThemeType>>(
        classID: number,
        request: T,
    ): Promise<Partial<Theme | null>> {
        const classExist = await ThemeRepository.GET_ID(classID);

        if (!classExist) {
            throw new CustomError(404, 'theme data is not found');
        }

        const identityExist = await ThemeRepository.GET_IDENTITY(
            request.title!,
        );

        if (identityExist) {
            throw new CustomError(400, 'this theme is already registered');
        }

        const updatedData = {
            ...classExist,
            ...request,
        };

        const updatedClass = await ThemeRepository.UPDATE(classID, updatedData);

        return updatedClass;
    }

    static async DELETE(classID: number): Promise<Partial<Theme | null>> {
        const classExist = await ThemeRepository.GET_ID(classID);

        if (!classExist) {
            throw new CustomError(404, 'theme data is not found');
        }

        const deletedClass = await ThemeRepository.DELETE(classID);

        return deletedClass;
    }
}
