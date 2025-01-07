'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Teacher } from '../user-type';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<Teacher>[] = [
    {
        accessorKey: 'fullname',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'nip',
        header: () => <div className="text-right">NIP</div>,
        cell: ({ row }) => {
            const rawNip = row.getValue('nip');

            if (typeof rawNip !== 'string' && typeof rawNip !== 'number') {
                return (
                    <div className="text-right font-medium">Invalid NIP</div>
                );
            }

            const formatted = rawNip
                .toString()
                .replace(/(\d{4})(?=\d)/g, '$1-'); // Menambahkan tanda '-' setiap 4 angka

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },

    {
        accessorKey: 'classID',
        header: 'Class ID',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    payment.id.toString(),
                                )
                            }
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Detail</DropdownMenuItem>
                        <DropdownMenuItem>Edit Data</DropdownMenuItem>
                        <DropdownMenuItem>Delete Data</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
