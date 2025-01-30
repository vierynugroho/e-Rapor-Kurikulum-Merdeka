import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActionMenu from './components/action-menu';
import { StudentType } from '@/types/student';

export const columns: ColumnDef<StudentType>[] = [
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
        accessorKey: 'gender',
        header: 'Jenis Kelamin',
        cell: ({ row }) =>
            row.original.gender === 'LAKI_LAKI' ? 'Laki-Laki' : 'Perempuan',
    },

    {
        accessorKey: 'religion',
        header: 'Agama',
    },
    {
        accessorFn: row => row.class?.name || '-',
        header: 'Kelas',
    },
    {
        id: 'Aksi',
        cell: ({ row }) => {
            const student = row.original;
            return <ActionMenu data={student} />;
        },
    },
];
