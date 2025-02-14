import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { TeacherType } from '../../../../../../types/teacher';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActionMenu from './components/action-menu';

export const columns: ColumnDef<TeacherType>[] = [
    {
        accessorKey: 'fullname',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Nama
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'identity_number',
        header: () => <div className="text-right">Nomor Identitas</div>,
        cell: ({ row }) => {
            const rawNip = row.getValue('identity_number');
            if (typeof rawNip !== 'string' && typeof rawNip !== 'number') {
                return (
                    <div className="text-right font-medium">
                        Nomor Identitas Invalid
                    </div>
                );
            }
            const formatted = rawNip
                .toString()
                .replace(/(\d{4})(?=\d)/g, '$1-');
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorFn: row => row.Class?.name || '-',
        header: 'Kelas',
    },
    {
        accessorKey: 'role',
        header: 'Peran',
        cell: ({ row }) => {
            const role = row.getValue('role');
            switch (role) {
                case 'TEACHER':
                    return 'Guru';
                case 'ADMIN':
                    return 'Admin';
                default:
                    return role;
            }
        },
    },
    {
        accessorKey: 'position',
        header: 'Jabatan',
        cell: ({ row }) => {
            const position = row.getValue('position');
            switch (position) {
                case 'TEACHER':
                    return 'Guru';
                case 'HEADMASTER':
                    return 'Kepala Sekolah';
                case 'committee':
                    return 'Komite';
                default:
                    return position;
            }
        },
    },
    {
        id: 'Aksi',
        cell: ({ row }) => {
            const teacher = row.original;
            return <ActionMenu teacher={teacher} />;
        },
    },
];
