// types/next-auth.d.ts
import { DefaultSession } from 'next-auth';
import { UserRole } from '@prisma/client'; // Sesuaikan dengan enum Role yang Anda gunakan

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: UserRole;
            identity_number: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: number;
        email: string | null;
        role: UserRole;
        fullname: string;
        identity_number: string;
    }
}
