import { APIResponse } from '@/utils/api-response';
import { CustomError, errorHandler } from '@/utils/error';
import { NextRequest } from 'next/server';
import { AssessmentService } from './service';

export class AssessmentController {
    static async UPSERT(request: NextRequest) {
        try {
            const requestBody = await request.json();

            const assessmentData = await AssessmentService.UPSERT(requestBody);

            return APIResponse.success(assessmentData, {
                message: 'assessment data updated successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async GET_BY_STUDENT(
        request: NextRequest,
        { params }: { params: { id: string } },
    ) {
        try {
            const { id } = params;
            const studentID = parseInt(id);

            if (isNaN(studentID)) {
                throw new CustomError(400, 'invalid student ID');
            }

            const assessmentData =
                await AssessmentService.GET_BY_STUDENT(studentID);

            return APIResponse.success(assessmentData, {
                message: 'assessment data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
