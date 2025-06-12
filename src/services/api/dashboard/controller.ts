// Pastikan export dynamic ditempatkan setelah import
import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { DashboardService } from './service';
import { NextRequest } from 'next/server';

// Deklarasi dynamic harus ditempatkan di level modul, bukan di dalam class
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export class DashboardController {
    static async GET(
        request: NextRequest,
        { params }: { params: { id: string } },
    ) {
        try {
            const { id } = params;
            const userId = parseInt(id);

            if (isNaN(userId)) {
                throw new CustomError(400, 'invalid user ID');
            }

            const data = await DashboardService.GET(userId);

            return APIResponse.success(data, {
                message: 'data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
