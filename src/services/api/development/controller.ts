import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { StudentDevelopmentService } from './service';
import {
    createSchema,
    updateSchema,
} from '@/app/(pages)/teacher/developments/form/validation';
import { CreateStudentDevelopment } from '@/types/student';

export class StudentDevelopmentController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = await StudentDevelopmentService.GET();

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
            const studentDevelopmentID = parseInt(id);

            if (isNaN(studentDevelopmentID)) {
                throw new CustomError(400, 'invalid student development ID');
            }

            const studentDevelopmentData =
                await StudentDevelopmentService.GET_ID(studentDevelopmentID);

            return APIResponse.success(studentDevelopmentData, {
                message: 'student development data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async POST(request: Request) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(createSchema, requestBody);
            console.log(data);

            const studentDevelopmentData: CreateStudentDevelopment = {
                notes: data.notes,
                height: data.height,
                weight: data.weight,
                studentID: parseInt(data.studentID),
                teacherID: parseInt('1'), // get from teacher logged in
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
