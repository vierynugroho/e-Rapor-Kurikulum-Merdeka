import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import ActionMenu from './components/action-menu';
import { StudentDevelopment } from '@/types/student';

export const columns: ColumnDef<StudentDevelopment>[] = [
    {
        id: 'ID',
        accessorKey: 'id',
        header: 'ID',
    },
    {
        id: 'fullname',
        header: 'Nama Siswa',
        accessorFn: row => row.Student?.fullname || '-',
        enableColumnFilter: true,
        filterFn: 'includesString',
    },
    {
        accessorKey: 'height',
        header: 'Tinggi Badan (cm)',
    },
    {
        accessorKey: 'weight',
        header: 'Berat Badan (kg)',
    },
    {
        id: 'Aksi',
        cell: ({ row }) => {
            const themes = row.original;
            return <ActionMenu data={themes} />;
        },
    },
];
