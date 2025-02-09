import { apiClient } from '@/lib/axios';
import { ReflectionType } from '@/types/student';

export const getReflectionsByClass = async () => {
    return apiClient.get<ReflectionType[]>('/reflections');
};

export const upsertReflections = async (data: ReflectionType) => {
    return apiClient.post<ReflectionType>('/reflections', data);
};
