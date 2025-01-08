import { ApiResponseBuilder } from '@/utils/api-response';
import { errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { teacherSchema } from './schema';
import { TeacherService } from './service';

export class TeacherController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = TeacherService.GET();
            return ApiResponseBuilder.success(data, {
                message: 'teachers data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async GET_ID(request: NextRequest) {
        try {
            const searchParams = request.nextUrl.searchParams;
            const query = searchParams.get('query');
            console.log(query);

            return ApiResponseBuilder.success(query, {
                message: 'teachers data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async POST(request: Request) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(teacherSchema, requestBody);

            const createPayment = await TeacherService.CREATE(data);

            return ApiResponseBuilder.created(createPayment, {
                message: 'teacher data created successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
