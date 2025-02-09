import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { NextRequest } from 'next/server';
import { ReflectionService } from './service';
import { getToken } from 'next-auth/jwt';

export class ReflectionController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const reflectionData = await ReflectionService.GET();

            return APIResponse.success(reflectionData, {
                message: 'reflections data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async GET_BY_CLASS_AND_ACTIVE_PERIOD(request: NextRequest) {
        try {
            console.log(request.json);
            const token = await getToken({
                req: request,
                secret: process.env.NEXTAUTH_SECRET,
            });

            if (!token) {
                throw new CustomError(401, 'unauthorized');
            }
            const reflectionData =
                await ReflectionService.GET_BY_CLASS_AND_ACTIVE_PERIOD(
                    token.id,
                );

            return APIResponse.success(reflectionData, {
                message: 'reflection data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async UPSERT(request: NextRequest) {
        try {
            const requestBody = await request.json();
            console.log('requestBody');
            console.log(requestBody);
            const updatedPeriod = await ReflectionService.UPSERT(requestBody);

            return APIResponse.success(updatedPeriod, {
                message: 'reflection data updated successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
