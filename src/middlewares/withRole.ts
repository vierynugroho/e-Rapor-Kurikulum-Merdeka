import { type NextRequest, NextResponse } from 'next/server';
import { RoleMiddlewareConfig } from '../types/middleware';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@prisma/client';

export const withRole = (
    middleware: (request: NextRequest) => Promise<NextResponse>,
    roleConfig: RoleMiddlewareConfig[],
) => {
    return async (request: NextRequest) => {
        const pathname = request.nextUrl.pathname;
        const token = await getToken({
            req: request,
            secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
        });

        if (!token) {
            return middleware(request);
        }

        const userRole = token.role as UserRole;

        for (const config of roleConfig) {
            if (pathname.startsWith(config.path)) {
                if (!config.roles.includes(userRole)) {
                    return NextResponse.redirect(
                        new URL(config.redirect, request.url),
                    );
                }
            }
        }

        return middleware(request);
    };
};
