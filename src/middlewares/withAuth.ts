import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

export const withAuth = (
    middleware: (request: NextRequest) => Promise<NextResponse>,
    protectedPaths: string[],
    publicPaths: string[],
) => {
    return async (request: NextRequest) => {
        const pathname = request.nextUrl.pathname;

        // Jika route adalah public, lanjutkan tanpa pengecekan
        if (publicPaths.includes(pathname)) {
            return middleware(request);
        }

        // Jika route dilindungi, cek token
        if (protectedPaths.some(path => pathname.startsWith(path))) {
            const token = await getToken({
                req: request,
                secret: process.env.AUTH_SECRET,
            });

            if (!token) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

        return middleware(request);
    };
};
