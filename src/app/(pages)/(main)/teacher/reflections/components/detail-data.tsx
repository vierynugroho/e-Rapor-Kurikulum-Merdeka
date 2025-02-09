import { ReflectionType } from '@/types/student';
import { formatDateTime } from '@/utils/format';
import React from 'react';

type DetailDataProps = {
    data: ReflectionType;
};

export const DetailData: React.FC<DetailDataProps> = ({ data }) => {
    return (
        <>
            <div className="max-w-4xl rounded-lg bg-background p-6 text-foreground shadow-lg">
                <div className="grid gap-6">
                    <div className="grid">
                        <div className="text-center">
                            <span className="font-medium">Nama Siswa</span>
                            <div className="flex-1">
                                {data.Student?.fullname}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Refleksi Guru
                            </span>
                            <div
                                className="flex-1"
                                dangerouslySetInnerHTML={{
                                    __html: data.description || '',
                                }}
                            ></div>
                        </div>
                        <div className="flex">
                            <span className="w-40 font-medium">Oleh:</span>
                            <div className="flex-1">
                                {data.Teacher?.fullname}
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Dibuat Pada:
                            </span>
                            <div className="flex-1">
                                {formatDateTime(data.createdAt!)}
                            </div>
                        </div>
                    </div>

                    <div className="grid">
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
