import { Student, Attendance } from '@prisma/client';
import { StudentAttendanceRepository } from './repository';
import { StudentAttendanceType } from '@/types/student';

export class StudentAttendanceService {
    static async GET_BY_CLASS(teacherID: number): Promise<Partial<Student[]>> {
        const students =
            await StudentAttendanceRepository.GET_BY_CLASS(teacherID);

        return students;
    }

    static async UPSERT<T extends Partial<StudentAttendanceType>>(
        request: T,
    ): Promise<Partial<Attendance | null>> {
        const updatedStudentAttendance =
            await StudentAttendanceRepository.UPSERT(request);

        return updatedStudentAttendance;
    }
}
