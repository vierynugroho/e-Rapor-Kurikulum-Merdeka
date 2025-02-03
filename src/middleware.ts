import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export default withAuth(
    async function middleware(req: NextRequestWithAuth) {
        const token = await getToken({ req });
        const isAuth = !!token;
        const isAuthPage = req.nextUrl.pathname.startsWith('/login');

        // Get user role from token
        const userRole = token?.role as string;
        console.log(token);
        if (isAuthPage) {
            if (isAuth) {
                switch (userRole) {
                    case 'TEACHER':
                        return NextResponse.redirect(
                            new URL('/teacher/dashboard', req.url),
                        );
                    case 'ADMIN':
                        return NextResponse.redirect(
                            new URL('/admin/dashboard', req.url),
                        );
                }
            }
            return null;
        }

        if (!isAuth) {
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }

            return NextResponse.redirect(
                new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
            );
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (
                    req.nextUrl.pathname.startsWith('/login') ||
                    req.nextUrl.pathname.startsWith('/api/auth')
                ) {
                    return true;
                }
                return !!token;
            },
        },
    },
);

export const config = {
    matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
