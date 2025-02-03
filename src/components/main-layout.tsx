// Server Component
import { AppSidebar } from '@/components/app-sidebar';
import { authOptions } from '@/services/api/auth';
import { getServerSession } from 'next-auth';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { MainContent } from './main-content';
import { UserRole } from '@prisma/client';

// Definisikan tipe untuk user session
interface UserSession {
    id: number;
    email: string | null;
    role: UserRole;
    fullname: string;
    identity_number: string;
}

async function fetchSession(): Promise<UserSession> {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw Error('error');
    }
    return session?.user;
}

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await fetchSession();

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <MainContent>{children}</MainContent>
            </SidebarInset>
        </SidebarProvider>
    );
}
