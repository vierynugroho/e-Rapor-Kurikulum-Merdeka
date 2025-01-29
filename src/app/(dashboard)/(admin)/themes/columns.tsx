import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
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
        accessorKey: 'title',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Judul
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },

    {
        id: 'Aksi',
        cell: ({ row }) => {
            const themes = row.original;
            return <ActionMenu data={themes} />;
        },
    },
];
