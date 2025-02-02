import MainLayout from '@/components/main-layout';
import AdminDashboardPage from './admin/dashboard/page';

export default function HomePage() {
    return (
        <>
            <MainLayout>
                <AdminDashboardPage />
            </MainLayout>
        </>
    );
}
