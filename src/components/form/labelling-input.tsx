/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LabellingInputProps {
    control: any;
    name: string;
    label: string;
    unit: string;
    placeholder?: string;
    id?: string;
    type?: string;
}

const LabellingInput: React.FC<LabellingInputProps> = ({
    control,
    name,
    label,
    placeholder,
    id,
    unit,
    type = 'text',
}) => {
    return (
        <div className={cn('w-full')}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <div className="flex items-center rounded-md border border-input bg-background">
                                <Input
                                    placeholder={placeholder}
                                    id={id}
                                    type={type}
                                    className={cn(
                                        'rounded-l-md border-0 text-sm focus-visible:ring-0',
                                    )}
                                    {...field}
                                />
                                <div className="flex items-center rounded-r-md border-l bg-muted px-3 py-2">
                                    <span className="text-sm text-muted-foreground">
                                        {unit}
                                    </span>
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default LabellingInput;
