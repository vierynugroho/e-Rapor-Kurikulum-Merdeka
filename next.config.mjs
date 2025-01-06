/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                pathname: '/**',
            },
        ],
        unoptimized: false,
        domains: ['ik.imagekit.io'],
    },
};

export default nextConfig;
