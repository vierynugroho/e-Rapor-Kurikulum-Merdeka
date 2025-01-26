import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActionMenu from './components/action-menu';
import { ClassType } from '@/types/class';

export const columns: ColumnDef<ClassType>[] = [
    {
        id: 'ID',
        accessorKey: 'id',
    },
    {
        accessorKey: 'name',
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
        id: 'Aksi',
        cell: ({ row }) => {
            const classes = row.original;
            return <ActionMenu classes={classes} />;
        },
    },
];
