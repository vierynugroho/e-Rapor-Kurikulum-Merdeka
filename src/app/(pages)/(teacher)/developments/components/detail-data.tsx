import { StudentDevelopment } from '@/types/student';
import React from 'react';

type DetailDataProps = {
    data: StudentDevelopment;
};

export const DetailData: React.FC<DetailDataProps> = ({ data }) => {
    return (
        <>
            <div className="max-w-4xl rounded-lg bg-background p-6 text-foreground shadow-lg">
                <div className="grid gap-6">
                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Nama Siswa:
                            </span>
                            <div className="flex-1">
                                {data.Student?.fullname}
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Tinggi Badan:
                            </span>
                            <div className="flex-1">{data.height} cm</div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Berat Badan:
                            </span>
                            <div className="flex-1">{data.weight} kg</div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">Catatan:</span>
                            <div
                                className="flex-1"
                                dangerouslySetInnerHTML={{
                                    __html: data.notes || '',
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
