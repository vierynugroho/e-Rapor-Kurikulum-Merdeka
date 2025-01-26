import { ClassType } from './../../../types/class';
import { apiClient } from '@/lib/axios';

export const getClasses = async () => {
    return apiClient.get<ClassType[]>('/classes');
};

export const getClass = async (classID: number) => {
    return apiClient.get<ClassType[]>(`/classes/${classID}`);
};

export const createClass = async (data: ClassType) => {
    return apiClient.post<ClassType>('/classes', data);
};

export const updateClass = async (classID: number, data: ClassType) => {
    return apiClient.put<ClassType>(`/classes/${classID}`, data);
};

export const deleteClass = async (classID: number) => {
    return apiClient.delete<ClassType>(`/classes/${classID}`);
};
