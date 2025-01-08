'use client';

import * as React from 'react';
import {
    BookOpenCheck,
    CalendarCheck,
    LayoutDashboard,
    School,
    School2,
    SwatchBook,
    Users,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { SchoolSwitcher } from '@/components/school-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { NavGeneral } from './nav-general';

const data = {
    user: {
        name: 'Viery Nugrpjp',
        email: 'viery@tkn2sanewa.com',
        avatar: '/avatars/shadcn.jpg',
    },
    schools: [
        {
            name: 'TK Negeri 2 Sananwetan',
            logo: School2,
            plan: 'e-Rapor Kurikulum Merdeka',
        },
    ],
    navMain: [
        {
            title: 'Data Siswa',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'Penilaian',
                    url: '/students',
                },
                {
                    title: 'Perkembangan',
                    url: '/students',
                },
            ],
        },
        {
            title: 'Data Guru',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '/teachers',
                },
            ],
        },
        {
            title: 'Data Periode',
            url: '#',
            icon: CalendarCheck,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '/periods',
                },
            ],
        },
        {
            title: 'Data Tema',
            url: '#',
            icon: SwatchBook,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '/themes',
                },
            ],
        },
        {
            title: 'Data Indikator Nilai',
            url: '#',
            icon: BookOpenCheck,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '/indicators',
                },
            ],
        },
        {
            title: 'Data Kelas',
            url: '#',
            icon: School,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '/classes',
                },
            ],
        },
    ],
    generals: [
        {
            name: 'Dashboard',
            url: '/',
            icon: LayoutDashboard,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SchoolSwitcher schools={data.schools} />
            </SidebarHeader>
            <SidebarContent>
                <NavGeneral generals={data.generals} />
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
