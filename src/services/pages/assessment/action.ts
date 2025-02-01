/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/lib/axios';
import { StudentScore, UpsertStudentScore } from '@/types/student';

export const getAssessment = async (studentID: number) => {
    return apiClient.get<StudentScore[]>(`/assessments/${studentID}`);
};

export const upsertAssessment = async (data: any) => {
    return apiClient.post<UpsertStudentScore>(`/assessments`, data);
};
