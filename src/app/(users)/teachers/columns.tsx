'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Teacher } from '../../../types/user-type';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Label } from '@/components/ui/label';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogHeader,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import FormTeacher from './form';

export const columns: ColumnDef<Teacher>[] = [
    {
        accessorKey: 'fullname',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
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
                .replace(/(\d{4})(?=\d)/g, '$1-');
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorFn: row => row.class?.name || '-',
        header: 'Class',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const teacher = row.original;
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={e => e.preventDefault()}
                                    key={`view-${teacher.id}`}
                                >
                                    View Detail
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Teacher Details</DialogTitle>
                                    <DialogDescription>
                                        Details information for{' '}
                                        {teacher.fullname}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Name
                                        </Label>
                                        <div className="col-span-3">
                                            {teacher.fullname}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Email
                                        </Label>
                                        <div className="col-span-3">
                                            {teacher.email}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            NIP
                                        </Label>
                                        <div className="col-span-3">
                                            {teacher.nip}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Role
                                        </Label>
                                        <div className="col-span-3">
                                            {teacher.role}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">
                                            Class ID
                                        </Label>
                                        <div className="col-span-3">
                                            {teacher.class?.name}
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={e => e.preventDefault()}
                                    key={`edit-${teacher.id}`}
                                >
                                    Edit Data
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Teacher</DialogTitle>
                                    <DialogDescription>
                                        Make changes to teacher profile here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <FormTeacher teacher={teacher} />
                                </div>
                            </DialogContent>
                        </Dialog>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={e => e.preventDefault()}
                                    className="text-red-600"
                                    key={`delete-${teacher.id}`}
                                >
                                    Delete Data
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Delete Teacher
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete{' '}
                                        {teacher.fullname}? This action cannot
                                        be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
