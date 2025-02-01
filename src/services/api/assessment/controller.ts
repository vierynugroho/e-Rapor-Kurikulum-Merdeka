import { APIResponse } from '@/utils/api-response';
import { errorHandler } from '@/utils/error';
import { validateSchema } from '@/utils/validator';
import { NextRequest } from 'next/server';
import { AssessmentService } from './service';
import { upsertSchema } from '@/app/(pages)/(teacher)/assessments/components/validation';

export class AssessmentController {
    static async UPSERT(request: NextRequest) {
        try {
            const requestBody = await request.json();
            const data = validateSchema(upsertSchema, requestBody);

            const updatedTheme = await AssessmentService.UPSERT(data);

            return APIResponse.success(updatedTheme, {
                message: 'theme data updated successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
