/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'http://localhost:3000, https://e-rapor-kurikulum-merdeka.vercel.app',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, DELETE, PATCH, POST, PUT, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
        unoptimized: false,
    },
    env: {
        TZ: 'Asia/Jakarta',
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.(pdf)$/,
            type: 'asset/resource',
        });

        return config;
    },
};

export default nextConfig;
