import { apiClient } from '@/lib/axios';
import { DashboardType } from '@/types/dashboard';

export const getDashboardData = async (userId: number) => {
    return apiClient.get<DashboardType>(`/dashboard/${userId}`);
};
