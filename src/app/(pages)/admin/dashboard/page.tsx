import MainLayout from '@/components/main-layout';
import AdminDashboardPage from './page';

export default function HomePage() {
    return (
        <>
            <MainLayout>
                <AdminDashboardPage />
            </MainLayout>
        </>
    );
}
