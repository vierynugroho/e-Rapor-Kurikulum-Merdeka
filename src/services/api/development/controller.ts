import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { StudentDevelopmentService } from './service';
import {
    createSchema,
    updateSchema,
} from '@/app/(pages)/(main)/teacher/developments/form/validation';
import { CreateStudentDevelopment } from '@/types/student';
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

    static async POST(request: Request) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(createSchema, requestBody);

            const userLoggedIn = await fetchServerSession();

            const studentDevelopmentData: CreateStudentDevelopment = {
                notes: data.notes,
                height: data.height,
                weight: data.weight,
                studentID: parseInt(data.studentID),
                teacherID: userLoggedIn.id,
            };

            const createdStudentDevelopment =
                await StudentDevelopmentService.CREATE(studentDevelopmentData);

            return APIResponse.created(createdStudentDevelopment, {
                message: 'student development data created successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async UPDATE(
        request: NextRequest,
        { params }: { params: { id: string } },
    ) {
        try {
            const { id } = params;
            const studentDevelopmentID = parseInt(id);

            if (isNaN(studentDevelopmentID)) {
                throw new CustomError(400, 'invalid student development ID');
            }

            const requestBody = await request.json();
            const data = validateSchema(updateSchema, requestBody);

            if (data.teacherID) {
                data.teacherID = parseInt(data.teacherID);
            }
            if (data.studentID) {
                data.studentID = parseInt(data.studentID);
            }

            const updatedStudentDevelopment =
                await StudentDevelopmentService.UPDATE(
                    studentDevelopmentID,
                    data,
                );

            return APIResponse.success(updatedStudentDevelopment, {
                message: 'student development data updated successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async DELETE(
        request: NextRequest,
        { params }: { params: { id: string } },
    ) {
        try {
            const { id } = params;
            const studentDevelopmentID = parseInt(id);

            if (isNaN(studentDevelopmentID)) {
                throw new CustomError(400, 'invalid student development ID');
            }

            const deletedStudentDevelopment =
                await StudentDevelopmentService.DELETE(studentDevelopmentID);

            return APIResponse.success(deletedStudentDevelopment, {
                message: 'student development data deleted successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
