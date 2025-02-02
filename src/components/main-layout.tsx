'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BreadcrumbItem {
    href: string;
    label: string;
    isLast: boolean;
}

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const generateBreadcrumbs = (): BreadcrumbItem[] => {
            const paths = pathname.split('/').filter(path => path);

            return paths.map((path, index) => ({
                href: `/${paths.slice(0, index + 1).join('/')}`,
                label: path.charAt(0).toUpperCase() + path.slice(1),
                isLast: index === paths.length - 1,
            }));
        };

        setBreadcrumbs(generateBreadcrumbs());
    }, [pathname]);

    if (!mounted) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex w-full items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            {/* Minimal header content during initial render */}
                            <div className="flex-1" />
                            <div className="ml-auto">
                                <ModeToggle />
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 p-4">
                        <div className="grid auto-rows-min gap-4">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex w-full items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/">
                                        e-Rapor TK Negeri 2 Sananwetan Kota
                                        Blitar
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                                {breadcrumbs.length > 0 && (
                                    <BreadcrumbSeparator className="hidden md:block" />
                                )}

                                {breadcrumbs.length === 0 ? (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            Dashboard
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                ) : (
                                    breadcrumbs.map(
                                        ({ href, label, isLast }) => (
                                            <BreadcrumbItem key={href}>
                                                {isLast ? (
                                                    <BreadcrumbPage>
                                                        {label}
                                                    </BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink href={href}>
                                                        {label}
                                                    </BreadcrumbLink>
                                                )}
                                                {!isLast && (
                                                    <BreadcrumbSeparator className="hidden md:block" />
                                                )}
                                            </BreadcrumbItem>
                                        ),
                                    )
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="ml-auto">
                            <ModeToggle />
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4">
                    <div className="grid auto-rows-min gap-4">{children}</div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
