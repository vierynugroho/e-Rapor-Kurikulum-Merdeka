'use client';

import * as React from 'react';
import {
    BookOpenCheck,
    CalendarCheck,
    LayoutDashboard,
    PenLine,
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
import { UserRole } from '@prisma/client';

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
                    title: 'Rapor Kelas',
                    url: '/teacher/reports',
                },
            ],
        },
        {
            title: 'Data Nilai',
            url: '#',
            icon: PenLine,
            items: [
                {
                    title: 'Penilaian',
                    url: '/teacher/assessments',
                },
                {
                    title: 'Perkembangan',
                    url: '/teacher/developments',
                },
                {
                    title: 'Refleksi Guru',
                    url: '/teacher/reflections',
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

interface UserSession {
    id: number;
    email: string | null;
    role: UserRole;
    fullname: string;
    identity_number: string;
}

const MemoizedSchoolSwitcher = React.memo(SchoolSwitcher);
const MemoizedNavUser = React.memo(NavUser);

export const AppSidebar = React.memo(({ user }: { user: UserSession }) => {
    return (
        <Sidebar key={user.id} collapsible="icon">
            <SidebarHeader>
                <MemoizedSchoolSwitcher schools={data.schools} />
            </SidebarHeader>
            <SidebarContent>
                <NavGeneral generals={data.generals} />
                {user.role === 'ADMIN' && <NavMain items={data.adminNavMain} />}
                {user.role === 'TEACHER' && (
                    <NavMain items={data.teacherNavMain} role="Teacher" />
                )}
            </SidebarContent>
            <SidebarFooter>
                <MemoizedNavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
});

AppSidebar.displayName = 'AppSidebar';
