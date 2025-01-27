import { CustomError } from '@/utils/error';
import { Period } from '@prisma/client';
import { PeriodRepository } from './repository';
import { CreatePeriodType, UpdatePeriodType } from '@/types/period';

export class PeriodService {
    static async GET(): Promise<Partial<Period>[]> {
        const periods = await PeriodRepository.GET();
        return periods;
    }

    static async GET_ID(periodID: number): Promise<Partial<Period | null>> {
        const periodData = await PeriodRepository.GET_ID(periodID);

        return periodData;
    }

    static async CREATE<T extends CreatePeriodType>(request: T) {
        const dataExist = await PeriodRepository.GET_IDENTITY(
            request.year,
            request.semester,
        );

        if (dataExist) {
            throw new CustomError(400, 'this period is already registered');
        }

        const newPeriod = await PeriodRepository.CREATE(request);

        return newPeriod;
    }

    static async UPDATE<T extends Partial<UpdatePeriodType>>(
        periodID: number,
        request: T,
    ): Promise<Partial<Period | null>> {
        const periodExist = await PeriodRepository.GET_ID(periodID);

        if (!periodExist) {
            throw new CustomError(404, 'period data is not found');
        }

        const dataExist = await PeriodRepository.GET_IDENTITY(
            request.year!,
            request.semester!,
        );

        if (dataExist) {
            if (
                dataExist.year !== periodExist.year &&
                dataExist.semester !== periodExist.semester
            ) {
                throw new CustomError(400, 'this period is already registered');
            }
        }

        const updatedData = {
            ...periodExist,
            ...request,
        };

        const updatedPeriod = await PeriodRepository.UPDATE(
            periodID,
            updatedData,
        );

        return updatedPeriod;
    }

    static async DELETE(periodID: number): Promise<Partial<Period | null>> {
        const periodExist = await PeriodRepository.GET_ID(periodID);

        if (!periodExist) {
            throw new CustomError(404, 'period data is not found');
        }

        const deletedPeriod = await PeriodRepository.DELETE(periodID);

        return deletedPeriod;
    }
}
