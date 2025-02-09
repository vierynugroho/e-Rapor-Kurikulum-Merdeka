import { apiClient } from '@/lib/axios';
import {
    CreateStudentDevelopment,
    StudentDevelopment,
    StudentType,
    UpdateStudentDevelopment,
} from '@/types/student';

export const getStudentDevelopments = async () => {
    return apiClient.get<StudentType[]>('/developments');
};

export const getStudentDevelopmentByClass = async (teacherID: number) => {
    return apiClient.get<StudentType[]>(`/developments/${teacherID}`);
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
