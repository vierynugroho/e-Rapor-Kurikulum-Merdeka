import React, { useState } from 'react';
import { MoreHorizontal, Eye, Download, FileText } from 'lucide-react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
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
import { StudentType } from '@/types/student';
import { DetailData } from './detail-data';
import RaporPDFDocument from '@/components/custom/rapor-template';

type ActionMenuProps = {
    student: StudentType;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ student }) => {
    const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);

    const getPdfFilename = () => {
        return `${student?.fullname!.toLowerCase().replace(/\s+/g, '-')}-rapor.pdf`;
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>

                    {/* View Student Details */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={e => e.preventDefault()}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[768px]">
                            <DialogHeader>
                                <DialogTitle>Detail Siswa</DialogTitle>
                                <DialogDescription>
                                    Detail Informasi untuk {student.fullname}
                                </DialogDescription>
                            </DialogHeader>
                            <DetailData data={student} />
                        </DialogContent>
                    </Dialog>

                    <DropdownMenuSeparator />

                    {/* View PDF Preview */}
                    <Dialog
                        open={isPdfPreviewOpen}
                        onOpenChange={setIsPdfPreviewOpen}
                    >
                        <DialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={e => e.preventDefault()}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Pratinjau Rapor
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="h-[95vh] max-h-[95vh] sm:max-w-[95vw]">
                            <DialogHeader>
                                <DialogTitle>
                                    Pratinjau Rapor untuk {student.fullname}
                                </DialogTitle>
                                <DialogDescription>
                                    Rapor bisa diunduh jika penilaian sudah
                                    dilakukan
                                </DialogDescription>
                            </DialogHeader>
                            <div className="h-full min-h-[80vh] w-full flex-1">
                                <PDFViewer
                                    width="100%"
                                    height="100%"
                                    className="rounded-md"
                                    showToolbar={false}
                                >
                                    <RaporPDFDocument student={student} />
                                </PDFViewer>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Download PDF */}
                    <DropdownMenuItem asChild className="cursor-pointer">
                        {student.readyToPrint && (
                            <PDFDownloadLink
                                document={
                                    <RaporPDFDocument student={student} />
                                }
                                fileName={getPdfFilename()}
                                className="flex items-center"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Unduh Rapor
                            </PDFDownloadLink>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ActionMenu;
