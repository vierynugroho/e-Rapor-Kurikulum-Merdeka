import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import ActionMenu from './components/action-menu';
import { StudentType } from '@/types/student';
import { ArrowUpDown, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
export const columns: ColumnDef<StudentType>[] = [
    {
        id: 'ID',
        accessorKey: 'id',
        header: 'ID',
    },
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
        accessorFn: row => row.hasAttendance || false,
        id: 'hasAttendance',
        header: 'Status Data',
        cell: ({ row }) => {
            const isActive = row.getValue<boolean>('hasAttendance');
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
                            <Check className="mr-1 h-4 w-4" /> Terisi
                        </>
                    ) : (
                        <>
                            <X className="mr-1 h-4 w-4" /> Belum Terisi
                        </>
                    )}
                </div>
            );
        },
    },

    {
        id: 'Aksi',
        cell: ({ row }) => {
            const student = row.original;
            return <ActionMenu data={student} />;
        },
    },
];
