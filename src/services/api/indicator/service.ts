import { CustomError } from '@/utils/error';
import { AssessmentAspects, Indicator } from '@prisma/client';
import { IndicatorRepository } from './repository';
import { CreateIndicatorType, UpdateIndicatorType } from '@/types/indicator';

export class IndicatorService {
    static async GET(): Promise<Partial<Indicator>[]> {
        const indicators = await IndicatorRepository.GET();
        return indicators;
    }

    static async GET_ID(
        indicatorID: number,
    ): Promise<Partial<Indicator | null>> {
        const indicatorData = await IndicatorRepository.GET_ID(indicatorID);

        return indicatorData;
    }

    static async GET_BY_TYPE(
        indicatorType: AssessmentAspects,
    ): Promise<Partial<Indicator>[]> {
        const indicatorData =
            await IndicatorRepository.GET_BY_TYPE(indicatorType);

        return indicatorData;
    }

    static async CREATE<T extends CreateIndicatorType>(request: T) {
        if (request.themeID) {
            const identityExist = await IndicatorRepository.GET_IDENTITY(
                request.title,
                request.themeID,
            );

            if (identityExist) {
                throw new CustomError(
                    400,
                    'this indicator is already registered',
                );
            }
        }

        const newIndicator = await IndicatorRepository.CREATE(request);

        return newIndicator;
    }

    static async UPDATE<T extends Partial<UpdateIndicatorType>>(
        indicatorID: number,
        request: T,
    ): Promise<Partial<Indicator | null>> {
        const indicatorExist = await IndicatorRepository.GET_ID(indicatorID);

        if (!indicatorExist) {
            throw new CustomError(404, 'indicator data is not found');
        }

        const updatedData = {
            ...indicatorExist,
            ...request,
        };

        const updatedIndicator = await IndicatorRepository.UPDATE(
            indicatorID,
            updatedData,
        );

        return updatedIndicator;
    }

    static async DELETE(
        indicatorID: number,
    ): Promise<Partial<Indicator | null>> {
        const indicatorExist = await IndicatorRepository.GET_ID(indicatorID);

        if (!indicatorExist) {
            throw new CustomError(404, 'indicator data is not found');
        }

        const deletedIndicator = await IndicatorRepository.DELETE(indicatorID);

        return deletedIndicator;
    }
}
