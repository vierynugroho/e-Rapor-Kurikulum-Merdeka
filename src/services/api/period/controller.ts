import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import {
    createSchema,
    updateSchema,
} from '@/app/(dashboard)/periods/form/validation';
import { PeriodService } from './service';
import { CreatePeriodType, UpdatePeriodType } from '@/types/period';

export class PeriodController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = await PeriodService.GET();

            return APIResponse.success(data, {
                message: 'periods data retrieved successfully',
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
            const periodID = parseInt(id);

            if (isNaN(periodID)) {
                throw new CustomError(400, 'invalid period ID');
            }

            const periodData = await PeriodService.GET_ID(periodID);

            return APIResponse.success(periodData, {
                message: 'period data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async POST(request: Request) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(createSchema, requestBody);

            const periodData: CreatePeriodType = {
                year: data.year,
                semester: data.semester,
                isActive: data.isActive ? true : false,
            };

            const createdPeriod = await PeriodService.CREATE(periodData);

            return APIResponse.created(createdPeriod, {
                message: 'period data created successfully',
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
            const periodID = parseInt(id);

            if (isNaN(periodID)) {
                throw new CustomError(400, 'invalid period ID');
            }

            const requestBody = await request.json();
            const data = validateSchema(updateSchema, requestBody);

            const periodData: UpdatePeriodType = {
                year: data.year,
                semester: data.semester,
                isActive: data.isActive ? true : false,
            };

            const updatedPeriod = await PeriodService.UPDATE(
                periodID,
                periodData,
            );

            return APIResponse.success(updatedPeriod, {
                message: 'period data updated successfully',
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
            const periodID = parseInt(id);

            if (isNaN(periodID)) {
                throw new CustomError(400, 'invalid period ID');
            }

            const deletedPeriod = await PeriodService.DELETE(periodID);

            return APIResponse.success(deletedPeriod, {
                message: 'period data deleted successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
