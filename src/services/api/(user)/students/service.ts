import { StudentRepository } from './repository';
import { CustomError } from '@/utils/error';
import { Student } from '@prisma/client';
import { CreateStudentType, UpdateStudentType } from '@/types/student';

export class StudentService {
    static async GET(): Promise<Partial<Student>[]> {
        const students = await StudentRepository.GET();

        return students;
    }

    static async GET_ID(studentID: number): Promise<Partial<Student | null>> {
        const student = await StudentRepository.GET_ID(studentID);

        if (!student) {
            throw new CustomError(404, 'student data is not found');
        }

        return student;
    }

    static async CREATE<T extends CreateStudentType>(request: T) {
        const identityExist = await StudentRepository.GET_IDENTITY(
            request.fullname,
        );

        if (identityExist) {
            throw new CustomError(
                400,
                `student with name ${request.fullname} is already registered`,
            );
        }

        const student = await StudentRepository.CREATE(request);

        return student;
    }

    static async UPDATE<T extends Partial<UpdateStudentType>>(
        studentID: number,
        request: T,
    ): Promise<Partial<Student | null>> {
        const studentDataExist = await StudentRepository.GET_ID(studentID);

        if (!studentDataExist) {
            throw new CustomError(404, 'student data is not found');
        }

        const updatedData = {
            ...studentDataExist,
            ...request,
        };

        const teacher = await StudentRepository.UPDATE(studentID, updatedData);

        return teacher;
    }

    static async DELETE(studentID: number): Promise<Partial<Student | null>> {
        const studentExist = await StudentRepository.GET_ID(studentID);

        if (!studentExist) {
            throw new CustomError(404, 'student data is not found');
        }

        const student = await StudentRepository.DELETE(studentID);

        return student;
    }
}
