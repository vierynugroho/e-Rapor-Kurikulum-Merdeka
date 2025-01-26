import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { ThemeService } from './service';
import {
    createSchema,
    updateSchema,
} from '@/app/(dashboard)/themes/form/validation';

export class ThemeController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const data = await ThemeService.GET();

            return APIResponse.success(data, {
                message: 'themes data retrieved successfully',
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
            const themeID = parseInt(id);

            if (isNaN(themeID)) {
                throw new CustomError(400, 'invalid theme ID');
            }

            const themeData = await ThemeService.GET_ID(themeID);

            return APIResponse.success(themeData, {
                message: 'theme data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async POST(request: Request) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(createSchema, requestBody);

            const createdTheme = await ThemeService.CREATE(data);

            return APIResponse.created(createdTheme, {
                message: 'theme data created successfully',
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
            const themeID = parseInt(id);

            if (isNaN(themeID)) {
                throw new CustomError(400, 'invalid theme ID');
            }

            const requestBody = await request.json();
            const data = validateSchema(updateSchema, requestBody);

            const updatedTheme = await ThemeService.UPDATE(themeID, data);

            return APIResponse.success(updatedTheme, {
                message: 'theme data updated successfully',
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
            const themeID = parseInt(id);

            if (isNaN(themeID)) {
                throw new CustomError(400, 'invalid theme ID');
            }

            const deletedTheme = await ThemeService.DELETE(themeID);

            return APIResponse.success(deletedTheme, {
                message: 'theme data deleted successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
