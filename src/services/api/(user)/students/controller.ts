import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { StudentService } from './service';
import {
    createSchema,
    updateSchema,
} from '@/app/(pages)/(main)/admin/(users)/students/form/validation';

export class StudentController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = await StudentService.GET();

            return APIResponse.success(data, {
                message: 'students data retrieved successfully',
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

            const student = await StudentService.GET_BY_CLASS(teacherID);

            return APIResponse.success(student, {
                message: 'student data retrieved successfully',
            });
        } catch (error) {
            console.log(error);
            return errorHandler(error);
        }
    }

    static async POST(request: Request) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(createSchema, requestBody);

            if (data.classID) {
                if (isNaN(data.classID)) {
                    throw new CustomError(400, 'Invalid Class ID');
                }

                data.classID = parseInt(String(data.classID));
            }

            const createPayment = await StudentService.CREATE(data);

            return APIResponse.created(createPayment, {
                message: 'student data created successfully',
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
            const studentID = parseInt(id);

            if (isNaN(studentID)) {
                throw new CustomError(400, 'invalid student ID');
            }

            const requestBody = await request.json();
            const data = validateSchema(updateSchema, requestBody);

            if (data.classID) {
                if (isNaN(data.classID)) {
                    throw new CustomError(400, 'Invalid Class ID');
                }

                data.classID = parseInt(String(data.classID));
            }

            const student = await StudentService.UPDATE(studentID, data);

            return APIResponse.success(student, {
                message: 'student data updated successfully',
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
            const studentID = parseInt(id);

            if (isNaN(studentID)) {
                throw new CustomError(400, 'invalid student ID');
            }

            const student = await StudentService.DELETE(studentID);

            return APIResponse.success(student, {
                message: 'student data deleted successfully',
            });
        } catch (error) {
            console.log(error);
            return errorHandler(error);
        }
    }
}
