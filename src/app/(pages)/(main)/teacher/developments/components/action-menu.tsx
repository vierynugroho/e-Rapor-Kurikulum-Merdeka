import React, { useState } from 'react';
import { MoreHorizontal, Edit, Eye } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { DetailData } from './detail-data';
import { UpdateStudentType } from '@/types/student';
import UpdateFormStudentDevelopment from '../form/update';

type ActionMenuProps = {
    data: UpdateStudentType;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ data }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setIsDropdownOpen(false);
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
                            <DialogTitle>Detail Perkembangan Siswa</DialogTitle>
                            <DialogDescription>
                                Detail Informasi untuk {data.fullname}
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
                            <Edit className="mr-2 h-4 w-4" /> Nilai Perkembangan
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] md:max-w-[768px]">
                        <DialogHeader>
                            <DialogTitle>
                                Edit Data Perkembangan Siswa
                            </DialogTitle>
                            <DialogDescription>
                                Perbarui data perkembangan siswa sekolah anda di
                                sini
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <UpdateFormStudentDevelopment
                                studentDevelopment={data}
                                onSuccess={handleCloseEditDialog}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionMenu;
