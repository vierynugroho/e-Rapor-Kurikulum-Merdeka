import { UserRole } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

export const withAuthToken = (
    middleware: (request: NextRequest) => Promise<NextResponse>,
    protectedApiPaths: string[],
) => {
    return async (request: NextRequest) => {
        const pathname = request.nextUrl.pathname;
        const token = await getToken({
            req: request,
            secret: process.env.AUTH_SECRET,
        });

        if (protectedApiPaths.some(path => pathname.startsWith(path))) {
            if (!token) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 },
                );
            }
        }

        const userRole = token?.role;

        if (request.nextUrl.pathname === '/' && token) {
            if (userRole === UserRole.ADMIN) {
                return NextResponse.redirect(
                    new URL('/admin/dashboard', request.url),
                );
            } else if (userRole === UserRole.TEACHER) {
                return NextResponse.redirect(
                    new URL('/teacher/dashboard', request.url),
                );
            }
        }

        return middleware(request);
    };
};
