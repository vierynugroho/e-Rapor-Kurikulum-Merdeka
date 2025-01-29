import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { ClassService } from './service';
import {
    createSchema,
    updateSchema,
} from '@/app/(dashboard)/(admin)/classes/form/validation';

export class ClassController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = await ClassService.GET();

            return APIResponse.success(data, {
                message: 'classes data retrieved successfully',
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
            const classID = parseInt(id);

            if (isNaN(classID)) {
                throw new CustomError(400, 'invalid class ID');
            }

            const classData = await ClassService.GET_ID(classID);

            return APIResponse.success(classData, {
                message: 'class data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async POST(request: Request) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(createSchema, requestBody);

            const createdClass = await ClassService.CREATE(data);

            return APIResponse.created(createdClass, {
                message: 'class data created successfully',
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
            const classID = parseInt(id);

            if (isNaN(classID)) {
                throw new CustomError(400, 'invalid class ID');
            }

            const requestBody = await request.json();
            const data = validateSchema(updateSchema, requestBody);

            const updatedClass = await ClassService.UPDATE(classID, data);

            return APIResponse.success(updatedClass, {
                message: 'class data updated successfully',
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
            const classID = parseInt(id);

            if (isNaN(classID)) {
                throw new CustomError(400, 'invalid class ID');
            }

            const deletedClass = await ClassService.DELETE(classID);

            return APIResponse.success(deletedClass, {
                message: 'class data deleted successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
