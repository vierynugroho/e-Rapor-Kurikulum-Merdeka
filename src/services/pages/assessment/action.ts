import { apiClient } from '@/lib/axios';
import { StudentScore } from '@/types/student';

export const getAssessment = async (studentID: number) => {
    return apiClient.get<StudentScore[]>(`/assessments/${studentID}`);
};

export const upsertAssessment = async (data: StudentScore) => {
    return apiClient.post<StudentScore>(`/assessments`, data);
};
