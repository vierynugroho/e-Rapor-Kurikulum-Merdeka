import { apiClient } from '@/lib/axios';
import {
    CreateIndicatorType,
    IndicatorType,
    UpdateIndicatorType,
} from '@/types/indicator';

export const getIndicators = async () => {
    return apiClient.get<IndicatorType[]>('/indicators');
};

export const getIndicator = async (indicatorID: number) => {
    return apiClient.get<IndicatorType[]>(`/indicators/${indicatorID}`);
};

export const createIndicator = async (data: CreateIndicatorType) => {
    return apiClient.post<IndicatorType>('/indicators', data);
};

export const updateIndicator = async (
    indicatorID: number,
    data: UpdateIndicatorType,
) => {
    return apiClient.put<IndicatorType>(`/indicators/${indicatorID}`, data);
};

export const deleteIndicator = async (indicatorID: number) => {
    return apiClient.delete<IndicatorType>(`/indicators/${indicatorID}`);
};
