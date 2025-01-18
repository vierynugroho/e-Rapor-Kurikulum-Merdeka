import { useToast } from '@/hooks/use-toast';
import { StudentType } from '@/types/student';
import { formatDateTime } from '@/utils/format';
import { CopyIcon } from 'lucide-react';
import React from 'react';

type DetailDataProps = {
    student: StudentType;
};

export const DetailData: React.FC<DetailDataProps> = ({ student }) => {
    const { toast } = useToast();
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
        <>
            <div className="mx-auto max-w-4xl rounded-lg bg-background p-6 text-foreground shadow-lg">
                <div className="grid gap-6">
                    {/* Informasi Umum */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">Nama:</span>
                            <div className="flex-1">{student.fullname}</div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">
                                ID Peserta Didik
                            </span>
                            <div className="flex flex-1 items-center">
                                {student.id}
                                <button
                                    title="Copy to clipboard"
                                    className="hover: ml-2"
                                    onClick={() =>
                                        copyToClipboard(student.id.toString()!)
                                    }
                                >
                                    <CopyIcon size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">Alamat:</span>
                            <div className="flex flex-1 items-center">
                                {student.address}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">Kelas:</span>
                            <div className="flex-1">
                                {student.class?.name || '-'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Wali Murid:
                            </span>
                            <div className="flex-1">{student.parentName}</div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">Agama</span>
                            <div className="flex-1">{student.religion}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Dibuat Pada:
                            </span>
                            <div className="flex-1">
                                {formatDateTime(student.createdAt!)}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Terakhir Diperbarui:
                            </span>
                            <div className="flex-1">
                                {formatDateTime(student.updatedAt!)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
