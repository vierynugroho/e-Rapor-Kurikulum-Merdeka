import { ClassRepository } from './repository';
import { CustomError } from '@/utils/error';
import { Class } from '@prisma/client';
import { ClassType } from '@/types/class';

export class ClassService {
    static async GET(): Promise<Partial<Class>[]> {
        const classes = await ClassRepository.GET();
        return classes;
    }

    static async GET_ID(classID: number): Promise<Partial<Class | null>> {
        const classData = await ClassRepository.GET_ID(classID);

        return classData;
    }

    static async CREATE<T extends ClassType>(request: T) {
        const identityExist = await ClassRepository.GET_IDENTITY(request.name);

        if (identityExist) {
            throw new CustomError(400, 'identity number is already registered');
        }

        const newClass = await ClassRepository.CREATE(request);

        return newClass;
    }

    static async UPDATE<T extends Partial<ClassType>>(
        classID: number,
        request: T,
    ): Promise<Partial<Class | null>> {
        const classExist = await ClassRepository.GET_ID(classID);

        if (!classExist) {
            throw new CustomError(404, 'class data is not found');
        }

        const updatedData = {
            ...classExist,
            ...request,
        };

        const updatedClass = await ClassRepository.UPDATE(classID, updatedData);

        return updatedClass;
    }

    static async DELETE(classID: number): Promise<Partial<Class | null>> {
        const classExist = await ClassRepository.GET_ID(classID);

        if (!classExist) {
            throw new CustomError(404, 'class data is not found');
        }

        const deletedClass = await ClassRepository.DELETE(classID);

        return deletedClass;
    }
}
