import { ClassType } from '@/types/class';
import { formatDateTime } from '@/utils/format';
import React from 'react';

type DetailDataProps = {
    data: ClassType;
};

export const DetailData: React.FC<DetailDataProps> = ({ data }) => {
    return (
        <>
            <div className="max-w-4xl rounded-lg bg-background p-6 text-foreground shadow-lg">
                <div className="grid gap-6">
                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">Nama:</span>
                            <div className="flex-1">{data.name}</div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">Kategori:</span>
                            <div className="flex-1">{data.category}</div>
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
