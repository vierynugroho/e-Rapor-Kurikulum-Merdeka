import MainLayout from '@/components/main-layout';

export default function SubMainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
