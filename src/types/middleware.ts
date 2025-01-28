import { CustomError } from '@/utils/error';
import { type UserRole } from '@prisma/client';
import { type NextFetchEvent, type NextRequest } from 'next/server';

export type MiddlewareFactory<T> = (
    middleware: (
        request: NextRequest,
        next: NextFetchEvent,
    ) => Promise<Response | CustomError>,
    options?: T,
) => (
    request: NextRequest,
    next: NextFetchEvent,
) => Promise<Response | CustomError>;

export interface RoleMiddlewareConfig {
    path: string;
    roles: UserRole[];
    redirect: string;
}
