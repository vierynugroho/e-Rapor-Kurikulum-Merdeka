'use client'; // Tambahkan directive ini untuk komponen client-side

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
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface BreadcrumbType {
    href: string;
    label: string;
    isLast: boolean;
}

export function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);

    useEffect(() => {
        const generateBreadcrumbs = (): BreadcrumbType[] => {
            const paths = pathname.split('/').filter(path => path);

            // Handle root path
            if (paths.length === 0) return [];

            return paths.map((path, index) => ({
                href: `/${paths.slice(0, index + 1).join('/')}`,
                label: path
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase()),
                isLast: index === paths.length - 1,
            }));
        };

        setBreadcrumbs(generateBreadcrumbs());
    }, [pathname]);

    return (
        <>
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex w-full items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">
                                    e-Rapor TK Negeri 2 Sananwetan Kota Blitar
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            {breadcrumbs.length > 0 && (
                                <BreadcrumbSeparator className="hidden md:block" />
                            )}

                            {breadcrumbs.length === 0 ? (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                breadcrumbs.map(({ href, label, isLast }) => (
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
                                    </BreadcrumbItem>
                                ))
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
        </>
    );
}
