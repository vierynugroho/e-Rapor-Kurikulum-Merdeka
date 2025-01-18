// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
