import { UserRole } from '@prisma/client';

export type UserLoggedInType = {
    id: number;
    role: UserRole;
    token: string;
};
