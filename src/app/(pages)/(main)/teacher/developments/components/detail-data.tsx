import { UpdateStudentType } from '@/types/student';
import { formatDateTime } from '@/utils/format';
import React from 'react';

type DetailDataProps = {
    data: UpdateStudentType;
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
                            <div className="flex-1">{data.fullname}</div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Tinggi Badan:
                            </span>
                            <div className="flex-1">
                                {data?.development?.height} cm
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Berat Badan:
                            </span>
                            <div className="flex-1">
                                {data?.development?.weight} kg
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">Catatan:</span>
                            <div
                                className="flex-1"
                                dangerouslySetInnerHTML={{
                                    __html: data?.development?.notes || '',
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
                                {data.development &&
                                    formatDateTime(data.development.createdAt!)}
                            </div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">
                                Terakhir Diperbarui:
                            </span>
                            <div className="flex-1">
                                {data.development &&
                                    formatDateTime(data.development.updatedAt!)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
