import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    name: string;
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    disabled?: boolean;
    noOptionsMessage?: (inputValue?: { inputValue: string }) => string;
}

export const SelectInput: React.FC<SelectProps> = ({
    control,
    name,
    label = 'Jenis Kelamin',
    placeholder = 'Pilih Jenis Kelamin',
    options,
    disabled = false,
    noOptionsMessage = () => 'Tidak ada opsi tersedia',
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field?.value?.toString()}
                    >
                        <FormControl>
                            <SelectTrigger disabled={disabled}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.length > 0 ? (
                                options.map(option => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))
                            ) : (
                                <div className="flex items-center justify-center px-2 py-2 text-sm text-muted-foreground">
                                    {noOptionsMessage({ inputValue: '' })}
                                </div>
                            )}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
