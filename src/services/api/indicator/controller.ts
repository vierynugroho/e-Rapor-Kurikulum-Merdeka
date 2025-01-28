import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { IndicatorService } from './service';
import {
    createSchema,
    updateSchema,
} from '@/app/(dashboard)/indicators/form/validation';

export class IndicatorController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = await IndicatorService.GET();

            return APIResponse.success(data, {
                message: 'indicators data retrieved successfully',
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
            const indicatorID = parseInt(id);

            if (isNaN(indicatorID)) {
                throw new CustomError(400, 'invalid indicator ID');
            }

            const indicatorData = await IndicatorService.GET_ID(indicatorID);

            return APIResponse.success(indicatorData, {
                message: 'indicator data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async POST(request: Request) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(createSchema, requestBody);

            if (data.themeID) {
                if (isNaN(data.themeID)) {
                    throw new CustomError(400, 'Invalid theme ID');
                }

                data.themeID = parseInt(String(data.themeID));
            }

            const createdIndicator = await IndicatorService.CREATE(data);

            return APIResponse.created(createdIndicator, {
                message: 'indicator data created successfully',
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
            const indicatorID = parseInt(id);

            if (isNaN(indicatorID)) {
                throw new CustomError(400, 'invalid indicator ID');
            }

            const requestBody = await request.json();
            const data = validateSchema(updateSchema, requestBody);

            if (data.themeID) {
                if (isNaN(data.themeID)) {
                    throw new CustomError(400, 'Invalid theme ID');
                }

                data.themeID = parseInt(String(data.themeID));
            }

            const updatedIndicator = await IndicatorService.UPDATE(
                indicatorID,
                data,
            );

            return APIResponse.success(updatedIndicator, {
                message: 'indicator data updated successfully',
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
            const indicatorID = parseInt(id);

            if (isNaN(indicatorID)) {
                throw new CustomError(400, 'invalid indicator ID');
            }

            const deletedIndicator = await IndicatorService.DELETE(indicatorID);

            return APIResponse.success(deletedIndicator, {
                message: 'indicator data deleted successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
