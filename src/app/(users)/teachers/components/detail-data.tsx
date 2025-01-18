import { useToast } from '@/hooks/use-toast';
import { CopyIcon } from 'lucide-react';
import React from 'react';

export const DetailData = ({ teacher }) => {
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
                        <div id="name" className="flex">
                            <span className="w-40 font-medium">Nama:</span>
                            <div className="flex-1">{teacher.fullname}</div>
                        </div>
                        <div id="identity_number" className="flex">
                            <span className="w-40 font-medium">
                                Nomor Identitas:
                            </span>
                            <div className="flex flex-1 items-center">
                                {teacher.identity_number}
                                <button
                                    title="Copy to clipboard"
                                    className="hover: ml-2"
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
                            <span className="w-40 font-medium">Email:</span>
                            <div className="flex flex-1 items-center">
                                {teacher.email}
                                <button
                                    title="Copy to clipboard"
                                    className="hover: ml-2"
                                    onClick={() =>
                                        copyToClipboard(teacher.email!)
                                    }
                                >
                                    <CopyIcon size={16} />
                                </button>
                            </div>
                        </div>
                        <div id="kelas" className="flex">
                            <span className="w-40 font-medium">Kelas:</span>
                            <div className="flex-1">
                                {teacher.class?.name || '-'}
                            </div>
                        </div>
                    </div>

                    {/* Peran */}
                    <div id="peran" className="flex">
                        <span className="w-40 font-medium">Peran:</span>
                        <div className="flex-1">{teacher.role}</div>
                    </div>

                    {/* Tanggal */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Dibuat Pada:
                            </span>
                            <div className="flex-1">
                                {new Intl.DateTimeFormat('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                }).format(new Date(teacher.createdAt!))}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Terakhir Diperbarui:
                            </span>
                            <div className="flex-1">
                                {new Intl.DateTimeFormat('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                }).format(new Date(teacher.updateAt!))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
