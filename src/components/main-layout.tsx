// Server Component
import { AppSidebar } from '@/components/app-sidebar';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { MainContent } from './main-content';
import { fetchServerSession } from '@/hooks/use-user';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await fetchServerSession();

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <MainContent>{children}</MainContent>
            </SidebarInset>
        </SidebarProvider>
    );
}
