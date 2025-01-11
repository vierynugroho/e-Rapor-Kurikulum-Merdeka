import { TeacherType } from '@/types/user-type';
// import { CustomError } from '@/utils/error';
import { TeacherRepository } from './repository';
import { CustomError } from '@/utils/error';
import { Teacher } from '@prisma/client';

export class TeacherService {
    static async CREATE<T extends TeacherType>(request: T) {
        const emailExist = await TeacherRepository.GET_EMAIL(request.email);

        if (emailExist) {
            throw new CustomError('email is already registered', 400);
        }

        const identityExist = await TeacherRepository.GET_IDENTITY(
            request.identity_number,
        );

        if (identityExist) {
            throw new CustomError('identity number is already registered', 400);
        }

        const teacher = await TeacherRepository.CREATE(request);

        return teacher;
    }

    static async GET(): Promise<Teacher[]> {
        const teachers = await TeacherRepository.GET();
        console.log(teachers);
        return teachers;
    }
}
