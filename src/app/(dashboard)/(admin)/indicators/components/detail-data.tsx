import { IndicatorType } from '@/types/indicator';
import React from 'react';

type DetailDataProps = {
    data: IndicatorType;
};

export const DetailData: React.FC<DetailDataProps> = ({ data }) => {
    return (
        <>
            <div className="max-w-4xl rounded-lg bg-background p-6 text-foreground shadow-lg">
                <div className="grid gap-6">
                    <div className="grid">
                        <div className="text-center">
                            <span className="font-medium">Judul</span>
                            <div className="flex-1">{data.title}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">Kategori:</span>
                            <div className="flex-1">
                                {data.assesment_type!.replace(/_/g, ' ')}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">Tema:</span>
                            <div className="flex-1">{data.theme?.title}</div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">Deskripsi:</span>
                            <div
                                className="flex-1"
                                dangerouslySetInnerHTML={{
                                    __html: data.description || '',
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid">
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
                                }).format(new Date(data.createdAt!))}
                            </div>
                        </div>
                    </div>

                    <div className="grid">
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
                                }).format(new Date(data.updatedAt!))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
