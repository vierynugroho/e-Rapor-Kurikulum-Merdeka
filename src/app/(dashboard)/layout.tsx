import MainLayout from '@/components/main-layout';

// src/app/login/layout.tsx
export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
