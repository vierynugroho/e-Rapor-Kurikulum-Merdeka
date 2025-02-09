import { CustomError } from '@/utils/error';
import { Student, Student_Development } from '@prisma/client';
import { StudentDevelopmentRepository } from './repository';
import {
    CreateStudentDevelopment,
    UpdateStudentDevelopment,
} from '@/types/student';

export class StudentDevelopmentService {
    static async GET(): Promise<Partial<Student_Development>[]> {
        const studentDevelopments = await StudentDevelopmentRepository.GET();
        return studentDevelopments;
    }

    static async GET_ID(
        studentDevelopmentID: number,
    ): Promise<Partial<Student_Development | null>> {
        const studentDevelopmentData =
            await StudentDevelopmentRepository.GET_ID(studentDevelopmentID);

        return studentDevelopmentData;
    }

    static async GET_BY_CLASS(teacherID: number): Promise<Partial<Student[]>> {
        const students =
            await StudentDevelopmentRepository.GET_BY_CLASS(teacherID);

        return students;
    }

    static async CREATE<T extends CreateStudentDevelopment>(request: T) {
        const dataExist = await StudentDevelopmentRepository.GET_IDENTITY(
            request.studentID!,
        );

        if (dataExist) {
            throw new CustomError(
                400,
                'this student development data is already registered',
            );
        }

        const newStudentDevelopment =
            await StudentDevelopmentRepository.CREATE(request);

        return newStudentDevelopment;
    }

    static async UPDATE<T extends Partial<UpdateStudentDevelopment>>(
        studentDevelopmentID: number,
        request: T,
    ): Promise<Partial<Student_Development | null>> {
        const studentDevelopmentExist =
            await StudentDevelopmentRepository.GET_ID(studentDevelopmentID);

        if (!studentDevelopmentExist) {
            throw new CustomError(404, 'student development data is not found');
        }

        const updatedData = {
            ...studentDevelopmentExist,
            ...request,
        };

        const updatedStudentDevelopment =
            await StudentDevelopmentRepository.UPDATE(
                studentDevelopmentID,
                updatedData,
            );

        return updatedStudentDevelopment;
    }

    static async DELETE(
        studentDevelopmentID: number,
    ): Promise<Partial<Student_Development | null>> {
        const studentDevelopmentExist =
            await StudentDevelopmentRepository.GET_ID(studentDevelopmentID);

        if (!studentDevelopmentExist) {
            throw new CustomError(404, 'student development data is not found');
        }

        const deletedStudentDevelopment =
            await StudentDevelopmentRepository.DELETE(studentDevelopmentID);

        return deletedStudentDevelopment;
    }
}
