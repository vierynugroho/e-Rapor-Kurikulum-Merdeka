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
import { useSession } from 'next-auth/react';

const data = {
    user: {
        name: 'Viery Nugroho',
        email: 'viery@tkn2sanewa.com',
        avatar: '/assets/Viery_Nugroho.png',
    },
    schools: [
        {
            name: 'TK Negeri 2 Sananwetan',
            logo: School2,
            plan: 'e-Rapor Kurikulum Merdeka',
        },
    ],
    adminNavMain: [
        {
            title: 'Data Siswa',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '/admin/students',
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
                    url: '/admin/teachers',
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
                    url: '/admin/periods',
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
                    url: '/admin/themes',
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
                    url: '/admin/indicators',
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
                    url: '/admin/classes',
                },
            ],
        },
    ],
    teacherNavMain: [
        {
            title: 'Data Siswa',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'Siswa Kelas',
                    url: '/teacher/students',
                },
                {
                    title: 'Penilaian',
                    url: '/teacher/assessments',
                },
                {
                    title: 'Perkembangan',
                    url: '/teacher/developments',
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

const MemoizedNavMain = React.memo(NavMain);
const MemoizedNavGeneral = React.memo(NavGeneral);
const MemoizedSchoolSwitcher = React.memo(SchoolSwitcher);
const MemoizedNavUser = React.memo(NavUser);

export const AppSidebar = React.memo(
    ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
        const { data: session } = useSession();
        const userRole = session?.user?.role;

        // Memoisasi navigasi berdasarkan role
        const adminNav = React.useMemo(
            () => <MemoizedNavMain items={data.adminNavMain} />,
            [],
        );

        const teacherNav = React.useMemo(
            () => (
                <MemoizedNavMain items={data.teacherNavMain} role="Teacher" />
            ),
            [],
        );

        return (
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader>
                    <MemoizedSchoolSwitcher schools={data.schools} />
                </SidebarHeader>
                <SidebarContent>
                    <MemoizedNavGeneral generals={data.generals} />
                    {userRole === 'ADMIN' && adminNav}
                    {userRole === 'TEACHER' && teacherNav}
                </SidebarContent>
                <SidebarFooter>
                    <MemoizedNavUser user={data.user} />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        );
    },
);

AppSidebar.displayName = 'AppSidebar';
