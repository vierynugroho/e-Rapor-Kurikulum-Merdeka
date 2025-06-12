import { DashboardRepository } from './repository';
import { DashboardType } from '@/types/dashboard';

export class DashboardService {
    static async GET(userID: number): Promise<DashboardType> {
        const students = await DashboardRepository.GET(userID);

        return students;
    }
}
