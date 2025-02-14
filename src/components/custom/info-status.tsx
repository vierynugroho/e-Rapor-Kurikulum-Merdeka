import React from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Check, Info, X } from 'lucide-react';

type StatusData = {
    hasDevelopment?: boolean;
    hasAllScores?: boolean;
    hasReflection?: boolean;
    hasAttendance?: boolean;
};

type StatusHoverCardProps = {
    data?: StatusData;
    trigger?: React.ReactNode;
};

const StatusItem = ({ label, value }: { label: string; value?: boolean }) => (
    <div className="flex items-center justify-between py-1">
        <span className="text-sm text-gray-600">{label}</span>
        {value ? (
            <Check className="h-4 w-4 text-green-500" />
        ) : (
            <X className="h-4 w-4 text-red-500" />
        )}
    </div>
);

const StatusHoverCard = ({ data, trigger }: StatusHoverCardProps) => {
    console.log(data);
    const statusItems = [
        { label: 'Perkembangan', value: data?.hasDevelopment || false },
        { label: 'Penilaian', value: data?.hasAllScores || false },
        { label: 'Refleksi Guru', value: data?.hasReflection || false },
        { label: 'Kehadiran', value: data?.hasAttendance || false },
    ];

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {trigger || (
                    <button className="inline-flex items-center">
                        <Info className="h-4 w-4" />
                    </button>
                )}
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Status Data Nilai</h4>
                    <div className="border-t pt-2">
                        {statusItems.map((item, index) => (
                            <StatusItem
                                key={index}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default StatusHoverCard;
