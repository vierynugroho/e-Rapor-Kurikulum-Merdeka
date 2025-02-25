import React, { useState } from 'react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { DetailData } from './detail-data';
import { deleteTheme } from '@/services/pages/theme';
import { UpdatePeriodType } from '@/types/period';
import UpdateFormPeriod from '../form/update';

type ActionMenuProps = {
    data: UpdatePeriodType;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ data }) => {
    const { toast } = useToast();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setIsDropdownOpen(false);
    };

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteTheme,
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Data periode berhasil dihapus.',
                variant: 'default',
            });
            queryClient.invalidateQueries({ queryKey: ['periods'] });
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
        if (data.id) {
            deleteMutation.mutate(data.id);
        }
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
                            <DialogTitle>Detail Periode</DialogTitle>
                            <DialogDescription>
                                Detail Informasi untuk periode {data.year}{' '}
                                {data.semester}
                            </DialogDescription>
                        </DialogHeader>
                        <DetailData data={data} />
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
                            <DialogTitle>Edit Data Periode</DialogTitle>
                            <DialogDescription>
                                Perbarui data periode sekolah anda di sini
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <UpdateFormPeriod
                                period={data}
                                onSuccess={handleCloseEditDialog}
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Delete Action */}
                {!data.isActive && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={e => e.preventDefault()}
                            >
                                <Trash className="mr-2 h-4 w-4" /> Hapus Data
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Hapus Periode
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah anda yakin untuk menghapus data{' '}
                                    {data.year} {data.semester}? Aksi ini tidak
                                    bisa dikembalikan.
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
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionMenu;
