import { Reflection } from '@prisma/client';
import { ReflectionRepository } from './repository';
import { ReflectionType } from '@/types/student';

export class ReflectionService {
    static async GET(): Promise<Partial<Reflection>[]> {
        const reflections = await ReflectionRepository.GET();
        return reflections;
    }

    static async GET_BY_CLASS_AND_ACTIVE_PERIOD(
        teacherId: number,
    ): Promise<Partial<Reflection>[]> {
        const reflectionData =
            await ReflectionRepository.GET_BY_CLASS_AND_ACTIVE_PERIOD(
                teacherId,
            );

        return reflectionData;
    }

    static async UPSERT<T extends Partial<ReflectionType>>(
        request: T,
    ): Promise<Partial<Reflection | null>> {
        const updatedReflection = await ReflectionRepository.UPSERT(request);

        return updatedReflection;
    }
}
