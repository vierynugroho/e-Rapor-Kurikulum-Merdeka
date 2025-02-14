import { apiClient } from '@/lib/axios';
import { StudentType, UpdateStudentDevelopment } from '@/types/student';

export const getStudentDevelopments = async () => {
    return apiClient.get<StudentType[]>('/developments');
};

export const getStudentDevelopmentByClass = async (teacherID: number) => {
    return apiClient.get<StudentType[]>(`/developments/${teacherID}`);
};

export const upsertStudentDevelopment = async (
    data: UpdateStudentDevelopment,
) => {
    return apiClient.post<UpdateStudentDevelopment>('/developments', data);
};
