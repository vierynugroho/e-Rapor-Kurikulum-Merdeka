import { apiClient } from '@/lib/axios';
import {
    CreateStudentDevelopment,
    StudentDevelopment,
    UpdateStudentDevelopment,
} from '@/types/student';

export const getStudentDevelopments = async () => {
    return apiClient.get<StudentDevelopment[]>('/developments');
};

export const getStudentDevelopment = async (studentDevelopmentID: number) => {
    return apiClient.get<StudentDevelopment[]>(
        `/developments/${studentDevelopmentID}`,
    );
};

export const createStudentDevelopment = async (
    data: CreateStudentDevelopment,
) => {
    return apiClient.post<CreateStudentDevelopment>('/developments', data);
};

export const updateStudentDevelopment = async (
    studentDevelopmentID: number,
    data: UpdateStudentDevelopment,
) => {
    return apiClient.put<UpdateStudentDevelopment>(
        `/developments/${studentDevelopmentID}`,
        data,
    );
};

export const deleteStudentDevelopment = async (
    studentDevelopmentID: number,
) => {
    return apiClient.delete<StudentDevelopment>(
        `/developments/${studentDevelopmentID}`,
    );
};
