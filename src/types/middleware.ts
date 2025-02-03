import { UserRole } from '@prisma/client';

export type RoleMiddlewareConfig = {
    path: string;
    roles: UserRole[];
    redirect: string;
};
