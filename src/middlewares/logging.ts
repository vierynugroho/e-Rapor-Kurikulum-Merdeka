import { type NextRequest, NextResponse } from 'next/server';

export const logging = (
    middleware: (request: NextRequest) => Promise<NextResponse>,
) => {
    return async (request: NextRequest) => {
        console.log(`[${request.method}] ${request.nextUrl.pathname}`);
        return middleware(request);
    };
};
