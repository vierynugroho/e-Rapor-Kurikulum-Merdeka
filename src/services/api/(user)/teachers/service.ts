import { Teacher } from '@/types/user-type';
// import { CustomError } from '@/utils/error';
import { TeacherRepository } from './repository';
import { teachersData } from './data';

export class TeacherService {
    static async CREATE<T extends Teacher>(request: T) {
        const teacher = await TeacherRepository.CREATE(request);

        return teacher;
    }

    // static async GET(): Promise<Product[]> #from prisma/client
    static GET() {
        const teachers = teachersData;
        return teachers;
    }
}
