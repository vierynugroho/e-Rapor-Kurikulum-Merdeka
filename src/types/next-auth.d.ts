// types/next-auth.d.ts
import { UserRole } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: number;
            email: string | null;
            role: UserRole;
            fullname: string;
            identity_number: string;
        };
    }

    interface User extends DefaultUser {
        id: number;
        email: string | null;
        role: UserRole;
        fullname: string;
        identity_number: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: number;
        email: string | null;
        role: UserRole;
        fullname: string;
        identity_number: string;
    }
}
