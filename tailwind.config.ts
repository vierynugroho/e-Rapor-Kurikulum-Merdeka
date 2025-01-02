import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            container: {
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1400px',
                    '2xl': '1736px',
                },
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                },
            },
            fontFamily: {
                poppins: ['var(--font-poppins)', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};
export default config;
