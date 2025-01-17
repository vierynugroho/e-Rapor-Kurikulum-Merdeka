// apiClient.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { CustomError } from '@/utils/error';

class ApiClient {
    private api: AxiosInstance;
    private baseURL: string;
    private tokenKey: string;

    constructor() {
        this.baseURL = process.env.BASE_URL || 'http://localhost:3000/api';
        this.tokenKey = process.env.TOKEN_KEY || 'token';

        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.api.interceptors.request.use(
            async config => {
                try {
                    const isServer = typeof window === 'undefined';
                    let token = '';

                    if (isServer) {
                        const { cookies } = await import('next/headers');
                        token =
                            cookies().get(process.env.TOKEN_KEY!)?.value || '';
                    } else {
                        token = document.cookie.replace(
                            new RegExp(
                                `(?:(?:^|.*;\\s*)${this.tokenKey}\\s*=\\s*([^;]*).*$)|^.*$`,
                            ),
                            '$1',
                        );
                    }

                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error) {
                    console.error('Error adding Authorization header:', error);
                }

                return config;
            },
            error => Promise.reject(error),
        );
    }

    private handleError(error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.log(axiosError?.response?.data?.['errors']?.message);

            if (axiosError.response) {
                throw new CustomError(
                    axiosError.response.status || 500,
                    axiosError.response.data?.['errors']?.message ||
                        'An error occurred',
                );
            }
            throw error;
        }
        throw error;
    }

    async get<T>(url: string): Promise<T> {
        try {
            const response: AxiosResponse<{ data: T }> =
                await this.api.get(url);
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async post<T>(url: string, data?: T): Promise<T> {
        try {
            const response: AxiosResponse<{ data: T }> = await this.api.post(
                url,
                data,
            );
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async put<T>(url: string, data?: T): Promise<T> {
        try {
            const response: AxiosResponse<{ data: T }> = await this.api.put(
                url,
                data,
            );
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async delete<T>(url: string): Promise<T> {
        try {
            const response: AxiosResponse<{ data: T }> =
                await this.api.delete(url);
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }
}

export const apiClient = new ApiClient();
