import { Student_Score } from '@prisma/client';
import { AssessmentRepository } from './repository';
import { StudentScore } from '@/types/student';

export class AssessmentService {
    static async GET_BY_STUDENT(
        studentID: number,
    ): Promise<Partial<Student_Score[]>> {
        const assessmentData =
            await AssessmentRepository.GET_BY_STUDENT(studentID);

        return assessmentData;
    }

    static async UPSERT<T extends Partial<StudentScore>>(
        request: T[],
    ): Promise<Partial<Student_Score>[]> {
        try {
            const updatedAssessments = await Promise.all(
                request.map(async assessment => {
                    try {
                        const result =
                            await AssessmentRepository.UPSERT(assessment);
                        return result;
                    } catch (error) {
                        console.error(`Failed to upsert assessment:`, error);
                        throw error;
                    }
                }),
            );

            return updatedAssessments.flat();
        } catch (error) {
            console.error('Bulk upsert failed:', error);
            throw error;
        }
    }
}
