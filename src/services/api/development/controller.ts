import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { NextRequest } from 'next/server';
import { StudentDevelopmentService } from './service';
import { fetchServerSession } from '@/hooks/use-user';

export class StudentDevelopmentController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const userLoggedIn = await fetchServerSession();
            const data = await StudentDevelopmentService.GET_BY_CLASS(
                userLoggedIn.id,
            );

            return APIResponse.success(data, {
                message: 'student developments data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async GET_ID(
        request: NextRequest,
        { params }: { params: { id: string } },
    ) {
        try {
            const { id } = params;
            const teacherID = parseInt(id);

            if (isNaN(teacherID)) {
                throw new CustomError(400, 'invalid teacher ID');
            }

            const studentDevelopmentData =
                await StudentDevelopmentService.GET_BY_CLASS(teacherID);

            return APIResponse.success(studentDevelopmentData, {
                message: 'student class data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async UPSERT(request: Request) {
        try {
            const requestBody = await request.json();

            const createdStudentDevelopment =
                await StudentDevelopmentService.UPSERT(requestBody);

            return APIResponse.created(createdStudentDevelopment, {
                message: 'student development data created successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
