import { apiClient } from '@/lib/axios';
import { StudentType } from '@/types/student';

export const getStudents = async () => {
    return apiClient.get<StudentType[]>('/students');
};

export const getStudent = async (studentID: number) => {
    return apiClient.get<StudentType[]>(`students/${studentID}`);
};

export const createStudent = async (data: StudentType) => {
    return apiClient.post<StudentType>('students', data);
};

export const updateStudent = async (data: StudentType) => {
    return apiClient.post<StudentType>('students', data);
};

export const deleteStudent = async (studentID: number) => {
    return apiClient.delete<StudentType>(`/students/${studentID}`);
};
