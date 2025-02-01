import { Student_Score } from '@prisma/client';
import { AssessmentRepository } from './repository';
import { StudentScore } from '@/types/student';

export class AssessmentService {
    static async GET_ID(
        assessmentID: number,
    ): Promise<Partial<Student_Score | null>> {
        const classData = await AssessmentRepository.GET_ID(assessmentID);

        return classData;
    }

    static async UPSERT<T extends Partial<StudentScore>>(
        request: T,
    ): Promise<Partial<Student_Score | null>> {
        const updatedClass = await AssessmentRepository.UPSERT(request);

        return updatedClass;
    }
}
