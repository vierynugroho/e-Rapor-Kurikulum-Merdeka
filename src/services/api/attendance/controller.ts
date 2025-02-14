import { APIResponse } from '@/utils/api-response';
import { errorHandler } from '@/utils/error';
import { NextRequest } from 'next/server';
import { StudentAttendanceService } from './service';
import { fetchServerSession } from '@/hooks/use-user';

export class StudentAttendanceController {
    static async GET(request: NextRequest) {
        try {
            console.log(request.json);
            const userLoggedIn = await fetchServerSession();
            const data = await StudentAttendanceService.GET_BY_CLASS(
                userLoggedIn.id,
            );

            console.log(data);

            return APIResponse.success(data, {
                message: 'student attendances data retrieved successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

    static async UPSERT(request: NextRequest) {
        try {
            const requestBody = await request.json();
            console.log(requestBody);
            const updatedStudentAttendance =
                await StudentAttendanceService.UPSERT(requestBody);

            return APIResponse.success(updatedStudentAttendance, {
                message: 'student attendance data updated successfully',
            });
        } catch (error) {
            return errorHandler(error);
        }
    }
}
