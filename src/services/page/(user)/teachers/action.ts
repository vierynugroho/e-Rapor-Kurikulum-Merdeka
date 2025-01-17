import { apiClient } from '@/lib/axios';
import { Teacher } from '@prisma/client';

export const getTeachers = async () => {
    return apiClient.get<Teacher[]>('/teachers');
};

export const getTeacher = async (teacherID: number) => {
    return apiClient.get<Teacher[]>(`/teachers/${teacherID}`);
};

export const createTeacher = async (data: Teacher) => {
    return apiClient.post<Teacher>('/teachers', data);
};

export const updateTeacher = async (data: Teacher) => {
    return apiClient.post<Teacher>('/teachers', data);
};
