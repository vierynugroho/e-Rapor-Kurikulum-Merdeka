// types/next-auth.d.ts
import { UserRole } from '@prisma/client'; // Sesuaikan dengan enum Role yang Anda gunakan

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            email: string | null;
            role: UserRole;
            fullname: string;
            identity_number: string;
        };
    }

    interface User {
        id: number;
        email: string | null;
        role: UserRole;
        fullname: string;
        identity_number: string;
    }
}
