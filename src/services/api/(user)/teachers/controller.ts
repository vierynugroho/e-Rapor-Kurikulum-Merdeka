import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { TeacherService } from './service';
import {
    createSchema,
    updateSchema,
} from '@/app/(dashboard)/(users)/teachers/form/validation';

export class TeacherController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = await TeacherService.GET();

            return APIResponse.success(data, {
                message: 'teachers data retrieved successfully',
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

            const teacher = await TeacherService.GET_ID(teacherID);

            return APIResponse.success(teacher, {
                message: 'teacher data retrieved successfully',
            });
        } catch (error) {
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

            const createPayment = await TeacherService.CREATE(data);

            return APIResponse.created(createPayment, {
                message: 'teacher data created successfully',
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
            const teacherID = parseInt(id);

            if (isNaN(teacherID)) {
                throw new CustomError(400, 'invalid teacher ID');
            }

            const requestBody = await request.json();
            const data = validateSchema(updateSchema, requestBody);

            if (data.classID) {
                if (isNaN(data.classID)) {
                    throw new CustomError(400, 'Invalid Class ID');
                }

                data.classID = parseInt(String(data.classID));
            }

            const teacher = await TeacherService.UPDATE(teacherID, data);

            return APIResponse.success(teacher, {
                message: 'teacher data updated successfully',
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
            const teacherID = parseInt(id);

            if (isNaN(teacherID)) {
                throw new CustomError(400, 'invalid teacher ID');
            }

            const teacher = await TeacherService.DELETE(teacherID);

            return APIResponse.success(teacher, {
                message: 'teacher data deleted successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
