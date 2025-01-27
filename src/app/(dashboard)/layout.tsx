import MainLayout from '@/components/main-layout';

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
