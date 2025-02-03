import { ThemeType } from '@/types/theme';
import { formatDateTime } from '@/utils/format';
import React from 'react';

type DetailDataProps = {
    data: ThemeType;
};

export const DetailData: React.FC<DetailDataProps> = ({ data }) => {
    return (
        <>
            <div className="max-w-4xl rounded-lg bg-background p-6 text-foreground shadow-lg">
                <div className="grid gap-6">
                    <div className="grid">
                        <div className="flex">
                            <span className="w-40 font-medium">Judul:</span>
                            <div className="flex-1">{data.title}</div>
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
