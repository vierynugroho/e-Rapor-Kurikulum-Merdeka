import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActionMenu from './components/action-menu';
import { ThemeType } from '@/types/theme';

export const columns: ColumnDef<ThemeType>[] = [
    {
        id: 'ID',
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'year',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Tahun
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'semester',
        header: 'Semester',
    },
    {
        accessorKey: 'isActive',
        header: 'Status Periode',
        cell: ({ row }) => {
            const isActive = row.getValue<boolean>('isActive');
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
                            <Check className="mr-1 h-4 w-4" /> Aktif
                        </>
                    ) : (
                        <>
                            <X className="mr-1 h-4 w-4" /> Non-Aktif
                        </>
                    )}
                </div>
            );
        },
    },
    {
        id: 'Aksi',
        cell: ({ row }) => {
            const themes = row.original;
            return <ActionMenu data={themes} />;
        },
    },
];
