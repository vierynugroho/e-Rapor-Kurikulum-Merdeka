/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LongTextInput.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

// Dynamically import TipTap editor components
const TipTapEditorComponent = dynamic(() => import('./../custom/tiptap'), {
    ssr: false,
    loading: () => (
        <div className="flex min-h-[200px] items-center justify-center rounded-md border bg-muted">
            <Loader2 className="h-6 w-6 animate-spin" />
        </div>
    ),
});

interface LongTextInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    control: any;
    required?: boolean;
    className?: string;
}

const LongTextInput: React.FC<LongTextInputProps> = ({
    name,
    label,
    placeholder,
    control,
    required = false,
    className,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && (
                        <FormLabel>
                            {label}{' '}
                            {required && (
                                <span className="text-destructive">*</span>
                            )}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="overflow-hidden rounded-md border">
                            <TipTapEditorComponent
                                value={field.value}
                                onChange={field.onChange}
                                placeholder={placeholder}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default LongTextInput;
