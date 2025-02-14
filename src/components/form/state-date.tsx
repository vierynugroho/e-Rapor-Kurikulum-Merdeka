import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DatePickerProps {
    label?: string;
    buttonLabel?: string;
    disabledDates?: (date: Date) => boolean;
    minDate?: Date;
    maxDate?: Date;
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    className?: string;
}

export const OnStateDatePicker: React.FC<DatePickerProps> = ({
    label = 'Tanggal',
    buttonLabel = 'Pilih tanggal',
    disabledDates,
    minDate = new Date('2010-01-01'),
    maxDate,
    value,
    onChange,
    className,
}) => {
    return (
        <div className={className}>
            {label && (
                <label className="mb-1 block text-sm font-medium">
                    {label}
                </label>
            )}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'w-full pl-3 text-left font-normal',
                            !value && 'text-muted-foreground',
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? (
                            format(value, 'PPP')
                        ) : (
                            <span>{buttonLabel}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={onChange}
                        disabled={(date: Date) =>
                            (disabledDates && disabledDates(date)) ||
                            (maxDate ? date > maxDate : false) ||
                            date < minDate
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
