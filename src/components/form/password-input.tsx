import React from 'react';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { PasswordComponent } from '../custom/password';

interface PasswordProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    id?: string;
}

export const PasswordInput: React.FC<PasswordProps> = ({
    control,
    name,
    label,
    placeholder,
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
                            <PasswordComponent
                                {...field}
                                placeholder={placeholder}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};
