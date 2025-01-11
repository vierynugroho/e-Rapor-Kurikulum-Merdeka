import { ApiResponseBuilder } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { TeacherService } from './service';
import { formSchema } from '@/app/(users)/teachers/form/validation';

export class TeacherController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = await TeacherService.GET();

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
            const data = validateSchema(formSchema, requestBody);

            if (data.classID) {
                if (isNaN(data.classID)) {
                    throw new CustomError('Invalid Class ID', 400);
                }

                data.classID = parseInt(String(data.classID));
            }

            const createPayment = await TeacherService.CREATE(data);

            return ApiResponseBuilder.created(createPayment, {
                message: 'teacher data created successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
