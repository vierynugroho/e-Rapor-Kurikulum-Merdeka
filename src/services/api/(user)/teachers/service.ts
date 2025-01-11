import { TeacherType } from '@/types/user-type';
import { TeacherRepository } from './repository';
import { CustomError } from '@/utils/error';
import { Teacher } from '@prisma/client';

export class TeacherService {
    static async GET(): Promise<Teacher[]> {
        const teachers = await TeacherRepository.GET();

        return teachers;
    }

    static async GET_ID(teacherID: number): Promise<Teacher | null> {
        const teacher = await TeacherRepository.GET_ID(teacherID);

        if (!teacher) {
            throw new CustomError(404, 'teacher data is not found');
        }

        return teacher;
    }

    static async CREATE<T extends TeacherType>(request: T) {
        const emailExist = await TeacherRepository.GET_EMAIL(request.email);

        if (emailExist) {
            throw new CustomError(400, 'email is already registered');
        }

        const identityExist = await TeacherRepository.GET_IDENTITY(
            request.identity_number,
        );

        if (identityExist) {
            throw new CustomError(400, 'identity number is already registered');
        }

        const teacher = await TeacherRepository.CREATE(request);

        return teacher;
    }

    static async UPDATE<T extends TeacherType>(
        teacherID: number,
        request: T,
    ): Promise<Teacher | null> {
        const teacherExist = await TeacherRepository.GET_ID(teacherID);

        if (!teacherExist) {
            throw new CustomError(404, 'teacher data is not found');
        }

        const teacher = await TeacherRepository.UPDATE(teacherID, request);

        return teacher;
    }

    static async DELETE(teacherID: number): Promise<Teacher | null> {
        const teacherExist = await TeacherRepository.GET_ID(teacherID);

        if (!teacherExist) {
            throw new CustomError(404, 'teacher data is not found');
        }

        const teacher = await TeacherRepository.DELETE(teacherID);

        return teacher;
    }
}
