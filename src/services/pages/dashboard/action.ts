import { apiClient } from '@/lib/axios';
import { DashboardType } from '@/types/dashboard';

export const getDashboardData = async () => {
    return apiClient.get<DashboardType>(`/dashboard`);
};
