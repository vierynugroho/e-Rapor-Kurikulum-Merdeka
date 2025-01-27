import React from 'react';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TextInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    id?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
    control,
    name,
    label,
    placeholder,
    type = 'text',
    id,
}) => {
    return (
        <div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                type={type}
                                placeholder={placeholder}
                                id={id}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};
