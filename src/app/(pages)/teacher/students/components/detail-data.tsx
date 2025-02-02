import { useToast } from '@/hooks/use-toast';
import { StudentType } from '@/types/student';
import { formatDateTime } from '@/utils/format';
import { CopyIcon } from 'lucide-react';
import React from 'react';

type DetailDataProps = {
    data: StudentType;
};

export const DetailData: React.FC<DetailDataProps> = ({ data }) => {
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
                            <div className="flex-1">{data.fullname}</div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">
                                ID Peserta Didik
                            </span>
                            <div className="flex flex-1 items-center">
                                {data.id}
                                <button
                                    title="Copy to clipboard"
                                    className="hover: ml-2"
                                    onClick={() =>
                                        copyToClipboard(data.id!.toString()!)
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
                                {data.address}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">Kelas:</span>
                            <div className="flex-1">
                                {data.Class?.name || '-'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Wali Murid:
                            </span>
                            <div className="flex-1">{data.parentName}</div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">Agama</span>
                            <div className="flex-1">{data.religion}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Tempat Lahir
                            </span>
                            <div className="flex-1">{data.birthPlace}</div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Tanggal Lahir
                            </span>
                            <div className="flex-1">
                                {formatDateTime(data.birthDate!)}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Dibuat Pada:
                            </span>
                            <div className="flex-1">
                                {formatDateTime(data.createdAt!)}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Terakhir Diperbarui:
                            </span>
                            <div className="flex-1">
                                {formatDateTime(data.updatedAt!)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
