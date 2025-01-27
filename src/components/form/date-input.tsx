import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    name: string;
    label?: string;
    placeholder?: string;
    disabledDates?: (date: Date) => boolean;
    minDate?: Date;
    maxDate?: Date;
}

export const DateInput: React.FC<DatePickerProps> = ({
    control,
    name,
    label = 'Tanggal',
    placeholder = 'Pilih tanggal',
    disabledDates,
    minDate = new Date('1900-01-01'),
    maxDate = new Date(),
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        'w-full pl-3 text-left font-normal',
                                        !field.value && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                        format(field.value, 'PPP')
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value as Date}
                                onSelect={(date: Date | undefined) =>
                                    field.onChange(date)
                                }
                                disabled={(date: Date) =>
                                    (disabledDates && disabledDates(date)) ||
                                    date > maxDate ||
                                    date < minDate
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
