import { type NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';
import { RoleMiddlewareConfig } from './types/middleware';
import { withAuthToken } from './middlewares/withAuthToken';
import { withRole } from './middlewares/withRole';
import { withAuth } from './middlewares/withAuth';
import { logging } from './middlewares/logging';

const middleware = async (request: NextRequest) => {
    return NextResponse.next({ request });
};

// Daftar route yang dilindungi (memerlukan autentikasi)
const protectedPaths = ['/teacher', '/admin'];

// Daftar route API yang dilindungi (memerlukan token)
const protectedApiPaths = [
    '/api/assessments',
    '/api/students',
    '/api/indicators',
    '/api/developments',
    '/api/themes',
    '/api/classes',
    '/api/periods',
    '/api/teachers',
];

// Daftar route yang dapat diakses tanpa autentikasi
const publicPaths = ['/login'];

// Konfigurasi role untuk proteksi route
const roleConfig: RoleMiddlewareConfig[] = [
    {
        path: '/admin',
        roles: [UserRole.ADMIN],
        redirect: '/login', // Redirect ke login jika role tidak sesuai
    },
    {
        path: '/teacher',
        roles: [UserRole.TEACHER],
        redirect: '/login', // Redirect ke login jika role tidak sesuai
    },
];

// Middleware handler dengan logging, auth, role, dan token protection
const middlewareHandler = logging(
    withAuthToken(
        withRole(withAuth(middleware, protectedPaths, publicPaths), roleConfig),
        protectedApiPaths,
    ),
);

export default middlewareHandler;

export const config = {
    matcher: ['/:path*', '/api/:path*'],
};
