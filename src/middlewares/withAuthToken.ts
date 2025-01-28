import { type MiddlewareFactory } from '@/types/middleware';
import { type NextFetchEvent, NextRequest } from 'next/server';
import * as jose from 'jose';
import { CustomError } from '@/utils/error';
import { jwtService } from '@/services/api/jwt/jwt-service';

export const withAuthToken: MiddlewareFactory<string[]> = (
    middleware,
    protectedApiPaths = [],
) => {
    return async (request: NextRequest, next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;

        if (!protectedApiPaths.some(path => pathname.startsWith(path))) {
            return middleware(request, next);
        }

        try {
            const authHeader = request.headers.get('authorization');

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return new CustomError(
                    401,
                    'Token is not found or improperly formatted',
                );
            }

            const token = authHeader.replace('Bearer ', '').trim();

            const user = await jwtService.verifyToken(token);

            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-user-id', String(user.id));

            const authorizedRequest = new NextRequest(request.url, {
                headers: requestHeaders,
                method: request.method,
                body: request.body,
                cache: request.cache,
                credentials: request.credentials,
                integrity: request.integrity,
                keepalive: request.keepalive,
                mode: request.mode,
                redirect: request.redirect,
            });

            return middleware(authorizedRequest, next);
        } catch (error) {
            if (error instanceof jose.errors.JWTExpired) {
                return new CustomError(401, 'Token is expired');
            }
            if (error instanceof jose.errors.JWSSignatureVerificationFailed) {
                return new CustomError(401, 'Invalid token signature');
            }
            return new CustomError(401, 'Unauthorized');
        }
    };
};
