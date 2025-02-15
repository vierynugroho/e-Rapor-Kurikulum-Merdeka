import { DashboardRepository } from './repository';
import { DashboardType } from '@/types/dashboard';

export class DashboardService {
    static async GET(teacherID: number): Promise<Partial<DashboardType>> {
        const students = await DashboardRepository.GET(teacherID);

        return students;
    }
}
