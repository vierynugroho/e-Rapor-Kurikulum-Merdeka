import { AxiosError } from 'axios';
import { z } from 'zod';
import { APIResponse } from './api-response';

export class CustomError extends Error {
    statusCode: number;
    constructor(statusCode: number = 500, message: string) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export function errorHandler(error: unknown) {
    const NODE_ENV = process.env.NODE_ENV || 'development';
    const isDevelopment = NODE_ENV === 'development' ? true : false;

    if (isDevelopment) {
        console.log(
            '\x1b[31m%s\x1b[0m',
            '=============== ERROR ==============',
        );
        console.log(Date());
        console.log(
            '\x1b[31m%s\x1b[0m',
            '====================================',
        );
        console.log(`${error || 'something error'}`);
        console.log(
            '\x1b[31m%s\x1b[0m',
            '====================================',
        );
    }

    // Handle custom application errors
    if (error instanceof CustomError) {
        return APIResponse.error(error.message, error.statusCode);
    }

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
        return APIResponse.error('Validation error', 400, error.errors);
    }

    // Handle Axios request errors
    if (error instanceof AxiosError) {
        const statusCode = error.response?.status || 400;
        const message = error.response?.data?.message || 'Axios error';
        return APIResponse.error(message, statusCode);
    }

    // Handle unknown or generic errors
    return APIResponse.error('Something went wrong', 500);
}
