import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Check, X } from 'lucide-react';
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
        accessorFn: row => row.Class?.name || '-',
        header: 'Kelas',
    },
    {
        accessorFn: row => row.readyToPrint || false,
        id: 'readyToPrint',
        header: 'Penilaian',
        cell: ({ row }) => {
            const isActive = row.getValue<boolean>('readyToPrint');
            return (
                <div
                    className={`inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ${
                        isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {isActive ? (
                        <>
                            <Check className="mr-1 h-4 w-4" /> Dinilai
                        </>
                    ) : (
                        <>
                            <X className="mr-1 h-4 w-4" /> Belum Dinilai
                        </>
                    )}
                </div>
            );
        },
    },
    {
        id: 'Aksi',
        cell: ({ row }) => {
            console.log(row.original);
            const student = row.original;
            return <ActionMenu student={student} />;
        },
    },
];
