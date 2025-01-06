'use client';

import * as React from 'react';
import {
    BookOpen,
    Bot,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
    user: {
        name: 'Viery Nugrpjp',
        email: 'viery@tkn2sanewa.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'TK Negeri 2 Sananwetan',
            logo: GalleryVerticalEnd,
            plan: 'e-Rapor Kurikulum Merdeka',
        },
    ],
    navMain: [
        {
            title: 'Data Siswa',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'Penilaian',
                    url: '#',
                },
                {
                    title: 'Perkembangan',
                    url: '#',
                },
            ],
        },
        {
            title: 'Data Guru',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '#',
                },
            ],
        },
        {
            title: 'Data Periode',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '#',
                },
            ],
        },
        {
            title: 'Data Tema',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '#',
                },
            ],
        },
        {
            title: 'Data Indikator Nilai',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '#',
                },
            ],
        },
        {
            title: 'Data Kelas',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Manajemen Data',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
