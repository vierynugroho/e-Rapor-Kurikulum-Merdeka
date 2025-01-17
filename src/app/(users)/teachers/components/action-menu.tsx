import React, { useState } from 'react';
import { CopyIcon } from 'lucide-react';
import { MoreHorizontal, Edit, Trash, Eye } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { Button } from '@/components/ui/button';
import { TeacherType } from '@/types/user-type';
import UpdateFormTeacher from '../form/update';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { deleteTeacher } from '@/services/page/(user)/teachers';

type ActionMenuProps = {
    teacher: TeacherType;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ teacher }) => {
    const { toast } = useToast();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setIsDropdownOpen(false);
    };

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteTeacher,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data guru berhasil dihapus.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
            setIsDropdownOpen(false);
        },
        onError: error => {
            toast({
                title: 'Gagal',
                description: error.message,
                variant: 'destructive',
            });
            console.error('Error:', error);
            setIsDropdownOpen(false);
        },
    });

    const handleDelete = () => {
        if (teacher.id) {
            deleteMutation.mutate(teacher.id);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast({
                    title: 'Berhasil',
                    description: 'Teks berhasil disalin ke clipboard!',
                    variant: 'default',
                });
            })
            .catch(err => {
                toast({
                    title: 'Gagal',
                    description: err.message,
                    variant: 'destructive',
                });
                console.error('Gagal menyalin teks: ', err);
            });
    };

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Buka menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                {/* View Action */}
                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[768px]">
                        <DialogHeader>
                            <DialogTitle>Detail Guru</DialogTitle>
                            <DialogDescription>
                                Detail Informasi for {teacher.fullname}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
                            <div className="grid gap-6">
                                {/* Informasi Umum */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div id="name" className="flex">
                                        <span className="w-40 font-medium text-gray-700">
                                            Nama:
                                        </span>
                                        <div className="flex-1 text-gray-900">
                                            {teacher.fullname}
                                        </div>
                                    </div>
                                    <div id="identity_number" className="flex">
                                        <span className="w-40 font-medium text-gray-700">
                                            Nomor Identitas:
                                        </span>
                                        <div className="flex flex-1 items-center text-gray-900">
                                            {teacher.identity_number}
                                            <button
                                                title="Copy to clipboard"
                                                className="ml-2 text-gray-500 hover:text-gray-900"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        teacher.identity_number!,
                                                    )
                                                }
                                            >
                                                <CopyIcon size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Informasi Kontak */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div id="email" className="flex">
                                        <span className="w-40 font-medium text-gray-700">
                                            Email:
                                        </span>
                                        <div className="flex flex-1 items-center text-gray-900">
                                            {teacher.email}
                                            <button
                                                title="Copy to clipboard"
                                                className="ml-2 text-gray-500 hover:text-gray-900"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        teacher.email!,
                                                    )
                                                }
                                            >
                                                <CopyIcon size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div id="kelas" className="flex">
                                        <span className="w-40 font-medium text-gray-700">
                                            Kelas:
                                        </span>
                                        <div className="flex-1 text-gray-900">
                                            {teacher.class?.name || '-'}
                                        </div>
                                    </div>
                                </div>

                                {/* Peran */}
                                <div id="peran" className="flex">
                                    <span className="w-40 font-medium text-gray-700">
                                        Peran:
                                    </span>
                                    <div className="flex-1 text-gray-900">
                                        {teacher.role}
                                    </div>
                                </div>

                                {/* Tanggal */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex">
                                        <span className="w-40 font-medium text-gray-700">
                                            Dibuat Pada:
                                        </span>
                                        <div className="flex-1 text-gray-600">
                                            {new Intl.DateTimeFormat('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            }).format(
                                                new Date(teacher.createdAt!),
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <span className="w-40 font-medium text-gray-700">
                                            Terakhir Diperbarui:
                                        </span>
                                        <div className="flex-1 text-gray-600">
                                            {new Intl.DateTimeFormat('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            }).format(
                                                new Date(teacher.updateAt!),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Edit Action */}
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Data
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] md:max-w-[768px]">
                        <DialogHeader>
                            <DialogTitle>Edit Data Guru</DialogTitle>
                            <DialogDescription>
                                Perbarui data guru sekolah anda di sini
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <UpdateFormTeacher
                                teacher={teacher}
                                onSuccess={handleCloseEditDialog}
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Delete Action */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <Trash className="mr-2 h-4 w-4" /> Hapus Data
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Guru</AlertDialogTitle>
                            <AlertDialogDescription>
                                Apakah anda yakin untuk menghapus data{' '}
                                {teacher.fullname}? Aksi ini tidak bisa
                                dikembalikan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-600"
                                onClick={handleDelete}
                            >
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionMenu;
