import { authOptions } from '@/services/api/auth';
import { getServerSession } from 'next-auth';
import { UserRole } from '@prisma/client';
import { CustomError } from '@/utils/error';

// Definisikan tipe untuk user session
interface UserSession {
    id: number;
    email: string | null;
    role: UserRole;
    fullname: string;
    identity_number: string;
}

export async function fetchServerSession(): Promise<UserSession> {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new CustomError(401, 'unauthorized');
    }
    return session?.user;
}
