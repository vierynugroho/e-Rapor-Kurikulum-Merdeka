import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.BASE_URL || 'http://localhost:3000/api';
const tokenKey = process.env.TOKEN_KEY || 'token';

if (!baseURL) {
    console.error('BASE_URL is not defined in environment variables.');
}

const isServer = typeof window === 'undefined';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async config => {
        try {
            let token = '';

            if (isServer) {
                // Server-side: Menggunakan `next/headers` untuk membaca cookies
                const cookieStore = cookies();
                token = cookieStore.get(tokenKey)?.value || '';
            } else {
                // Client-side: Menggunakan `document.cookie`
                token = document.cookie.replace(
                    new RegExp(
                        `(?:(?:^|.*;\\s*)${tokenKey}\\s*=\\s*([^;]*).*$)|^.*$`,
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
    error => {
        return Promise.reject(error);
    },
);

export default api;
