import { apiClient } from '@/lib/axios';
import { Student } from '@prisma/client';

export const getStudents = async () => {
    return apiClient.get<Student[]>('/students');
};

export const getStudent = async (studentID: number) => {
    return apiClient.get<Student[]>(`students/${studentID}`);
};

export const createStudent = async (data: Student) => {
    return apiClient.post<Student>('students', data);
};

export const updateStudent = async (data: Student) => {
    return apiClient.post<Student>('students', data);
};
