'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Teacher } from '../../../types/user-type';

import { MoreHorizontal, ArrowUpDown, Trash, Edit, Eye } from 'lucide-react';
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
        accessorFn: row => row.kelas?.name || '-',
        header: 'Kelas',
    },
    {
        accessorKey: 'role',
        header: 'Peran',
    },
    {
        id: 'Aksi',
        cell: ({ row }) => {
            const teacher = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Buka menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        {/* detail action */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={e => e.preventDefault()}
                                    key={`view-${teacher.id}`}
                                >
                                    <Eye /> Lihat Detail
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
                                            Identity Number
                                        </Label>
                                        <div className="col-span-3">
                                            {teacher.identity_number}
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
                                            {teacher.kelas?.name}
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        {/* edit action */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={e => e.preventDefault()}
                                    key={`edit-${teacher.id}`}
                                >
                                    <Edit /> Edit Data
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Data Guru</DialogTitle>
                                    <DialogDescription>
                                        Perbarui data guru sekolah anda di sini
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <FormTeacher teacher={teacher} />
                                </div>
                            </DialogContent>
                        </Dialog>
                        {/* delete action */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={e => e.preventDefault()}
                                    key={`delete-${teacher.id}`}
                                >
                                    <Trash /> Hapus Data
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Hapus Guru
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Apakah anda yakin untuk menghapus data{' '}
                                        {teacher.fullname}? Aksi ini tidak bisa
                                        dikembalikan.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600">
                                        Hapus
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
