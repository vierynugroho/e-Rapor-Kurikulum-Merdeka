import { apiClient } from '@/lib/axios';
import { CreatePeriodType, PeriodType, UpdatePeriodType } from '@/types/period';

export const getPeriods = async () => {
    return apiClient.get<PeriodType[]>('/periods');
};

export const getPeriod = async (periodID: number) => {
    return apiClient.get<PeriodType[]>(`/periods/${periodID}`);
};

export const getActivePeriod = async () => {
    return apiClient.get<PeriodType>(`/periods/active/info`);
};

export const createPeriod = async (data: CreatePeriodType) => {
    return apiClient.post<PeriodType>('/periods', data);
};

export const updatePeriod = async (
    periodID: number,
    data: UpdatePeriodType,
) => {
    return apiClient.put<PeriodType>(`/periods/${periodID}`, data);
};

export const deletePeriod = async (periodID: number) => {
    return apiClient.delete<PeriodType>(`/periods/${periodID}`);
};
