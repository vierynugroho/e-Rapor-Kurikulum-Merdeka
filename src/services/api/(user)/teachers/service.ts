import { CreateTeacherType, UpdateTeacherType } from '@/types/teacher';
import { TeacherRepository } from './repository';
import { CustomError } from '@/utils/error';
import { Teacher } from '@prisma/client';

export class TeacherService {
    static async GET(): Promise<Partial<Teacher>[]> {
        const teachers = await TeacherRepository.GET();

        return teachers.map(teacher => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...teacherWithoutPassword } = teacher;
            return teacherWithoutPassword;
        });
    }

    static async GET_ID(teacherID: number): Promise<Partial<Teacher | null>> {
        const teacher = await TeacherRepository.GET_ID(teacherID);

        if (!teacher) {
            throw new CustomError(404, 'teacher data is not found');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...teacherWithoutPassword } = teacher;
        return teacherWithoutPassword;
    }

    static async CREATE<T extends CreateTeacherType>(request: T) {
        const emailExist = await TeacherRepository.GET_EMAIL(request.email!);

        if (emailExist) {
            throw new CustomError(400, 'email is already registered');
        }

        const identityExist = await TeacherRepository.GET_IDENTITY(
            request.identity_number!,
        );

        if (identityExist) {
            throw new CustomError(400, 'identity number is already registered');
        }

        const teacher = await TeacherRepository.CREATE(request);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...teacherWithoutPassword } = teacher;
        return teacherWithoutPassword;
    }

    static async UPDATE<T extends Partial<UpdateTeacherType>>(
        teacherID: number,
        request: T,
    ): Promise<Partial<Teacher | null>> {
        const teacherExist = await TeacherRepository.GET_ID(teacherID);

        if (!teacherExist) {
            throw new CustomError(404, 'teacher data is not found');
        }

        const updatedData = {
            ...teacherExist,
            ...request,
        };

        const teacher = await TeacherRepository.UPDATE(teacherID, updatedData);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...teacherWithoutPassword } = teacher;
        return teacherWithoutPassword;
    }

    static async DELETE(teacherID: number): Promise<Partial<Teacher | null>> {
        const teacherExist = await TeacherRepository.GET_ID(teacherID);

        if (!teacherExist) {
            throw new CustomError(404, 'teacher data is not found');
        }

        const teacher = await TeacherRepository.DELETE(teacherID);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...teacherWithoutPassword } = teacher;
        return teacherWithoutPassword;
    }
}
