import { type NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';
import type { RoleMiddlewareConfig } from './types/middleware';
import { withAuthToken } from './middlewares/withAuthToken';
import { withRole } from './middlewares/withRole';
import { withAuth } from './middlewares/withAuth';

const middleware = async (request: NextRequest) => {
    if (request.nextUrl.pathname === '/dashboard/store') {
        return NextResponse.redirect(
            new URL('/dashboard/store/product', request.url),
        );
    }
    return NextResponse.next({ request });
};

const protectedPaths = ['/dashboard', '/teacher', '/admin'];

const roleConfig: RoleMiddlewareConfig[] = [
    {
        path: '/admin',
        roles: [UserRole.ADMIN],
        redirect: '/admin/dashboard',
    },
    {
        path: '/teacher',
        roles: [UserRole.TEACHER],
        redirect: '/teacher/dashboard',
    },
];

const protectedApiPaths = [
    '/api/v1/assessments',
    '/api/v1/students',
    '/api/v1/indicators',
    '/api/v1/developments',
    '/api/v1/themes',
    '/api/v1/classes',
    '/api/v1/periods',
    '/api/v1/teachers',
];

const middlewareHandler = withAuthToken(
    withRole(withAuth(middleware, protectedPaths), roleConfig),
    protectedApiPaths,
);

export default middlewareHandler;

export const config = {
    matcher: ['/:path*', '/api/:path*'],
};
