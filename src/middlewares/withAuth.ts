import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

export const withAuth = (
    middleware: (request: NextRequest) => Promise<NextResponse>,
    protectedPaths: string[],
    publicPaths: string[],
) => {
    return async (request: NextRequest) => {
        const pathname = request.nextUrl.pathname;
        const token = await getToken({
            req: request,
            secret: process.env.AUTH_SECRET,
        });

        // Jika route adalah public, lanjutkan tanpa pengecekan
        if (publicPaths.includes(pathname)) {
            if (token) {
                return NextResponse.redirect(new URL('/', request.url));
            }
            return middleware(request);
        }

        // Jika route dilindungi, cek token
        if (protectedPaths.some(path => pathname.startsWith(path))) {
            if (!token) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

        return middleware(request);
    };
};
