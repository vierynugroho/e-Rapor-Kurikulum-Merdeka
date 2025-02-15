import { APIResponse } from '@/utils/api-response';
import { errorHandler } from '@/utils/error';
import { NextRequest } from 'next/server';
import { DashboardService } from './service';
import { fetchServerSession } from '@/hooks/use-user';

export class DashboardController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const userLoggedIn = await fetchServerSession();
            const data = await DashboardService.GET(userLoggedIn.id);

            console.log(data);

            return APIResponse.success(data, {
                message: 'data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
