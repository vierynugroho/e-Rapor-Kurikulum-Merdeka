import { apiClient } from '@/lib/axios';
import { TeacherType } from '@/types/teacher';

export const getTeachers = async () => {
    return apiClient.get<TeacherType[]>('/teachers');
};

export const getTeacher = async (teacherID: number) => {
    return apiClient.get<TeacherType[]>(`/teachers/${teacherID}`);
};

export const createTeacher = async (data: TeacherType) => {
    return apiClient.post<TeacherType>('/teachers', data);
};

export const updateTeacher = async (teacherID: number, data: TeacherType) => {
    return apiClient.put<TeacherType>(`/teachers/${teacherID}`, data);
};

export const deleteTeacher = async (teacherID: number) => {
    return apiClient.delete<TeacherType>(`/teachers/${teacherID}`);
};
