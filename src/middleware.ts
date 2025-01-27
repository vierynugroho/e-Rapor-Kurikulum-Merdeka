// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserLoggedInType } from './types/user';

export async function middleware(request: NextRequest) {
    console.log('=======================');
    console.log(request.method);
    const response = NextResponse.next();

    // CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
    );
    response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
    );

    const { pathname }: { pathname: string } = request.nextUrl;
    // const token = await getToken({ req: request });
    const token = {
        user: {
            role: 'ADMIN',
            id: 1,
            token: 'token',
        },
    };
    // const token = null;
    const user: UserLoggedInType | null = token?.user as UserLoggedInType;

    const Redirect = () => {
        if (user.role == 'ADMIN') {
            return NextResponse.redirect(
                new URL('/admin/Dashboard', request.url),
            );
        } else if (user.role == 'TEACHER') {
            return NextResponse.redirect(
                new URL('/teacher/Dashboard', request.url),
            );
        } else {
            return NextResponse.redirect(
                new URL(
                    '/login?error=Please login first to access this route',
                    request.url,
                ),
            );
        }
    };
    const authRoutes = ['/login'];

    if (!!token && authRoutes.includes(pathname)) {
        return Redirect();
    }
    if (
        (!!token && pathname.startsWith('/admin') && user.role !== 'ADMIN') ||
        (!!token && pathname.startsWith('/teacher') && user.role !== 'TEACHER')
    ) {
        return Redirect();
    }

    if (!token) {
        console.log('token tidak ada');
        if (
            pathname.includes('/api') ||
            pathname.includes('/api/admin') ||
            pathname.includes('/api/teacher')
        ) {
            return Response.json(
                { success: false, message: 'authentication failed' },
                { status: 401 },
            );
        }
    } else {
        // if (
        //     (pathname.startsWith('/api/admin') && user.role !== 'ADMIN') ||
        //     (pathname.startsWith('/api/teacher') && user.role !== 'TEACHER')
        // ) {
        //     console.log(pathname, user.role);
        //     return Response.json(
        //         { success: false, message: 'authentication failed' },
        //         { status: 401 },
        //     );
        console.log(pathname, user.role);
    }
}

export const config = {
    matcher: [
        '/login',
        '/admin/:path*',
        '/teacher/:path*',
        '/api/:path*',
        '/api/admin/:function*',
        '/api/teacher/:function*',
    ],
};
