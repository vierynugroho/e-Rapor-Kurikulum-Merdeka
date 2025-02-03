import MainLayout from '@/components/main-layout';
import TeacherDashboardPage from './dashboard';

export default function HomePage() {
    return (
        <>
            <MainLayout>
                <TeacherDashboardPage />
            </MainLayout>
        </>
    );
}
