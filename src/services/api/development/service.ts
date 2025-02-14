import { Student, Student_Development } from '@prisma/client';
import { StudentDevelopmentRepository } from './repository';
import { CreateStudentDevelopment } from '@/types/student';

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

    static async UPSERT<T extends CreateStudentDevelopment>(request: T) {
        const studentDevelopment =
            await StudentDevelopmentRepository.UPSERT(request);

        return studentDevelopment;
    }
}
