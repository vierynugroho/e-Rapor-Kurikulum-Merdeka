import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useTerritoryStore } from '@/store/territory';

export function TerritoryCombobox({ control, name, label = 'Pilih Tempat' }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    const {
        allRegencies = [],
        fetchAllRegencies,
        isLoading,
    } = useTerritoryStore();

    React.useEffect(() => {
        if (allRegencies.length === 0 && !isLoading) {
            fetchAllRegencies();
        }
    }, []);

    const handleSelect = React.useCallback(
        (currentValue: string, field) => {
            const newValue = currentValue === value ? '' : currentValue;
            setValue(newValue);
            field.onChange(newValue);
        },
        [value],
    );

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {value
                                        ? allRegencies.find(
                                              regency => regency.name === value,
                                          )?.name
                                        : 'Pilih Kabupaten/Kota...'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Cari Kabupaten/Kota..." />
                                    <CommandList className="max-h-64 overflow-y-auto">
                                        <CommandEmpty>
                                            Tidak ada Kabupaten/Kota ditemukan.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {allRegencies.map(regency => (
                                                <CommandItem
                                                    key={regency.id}
                                                    value={regency.name}
                                                    onSelect={() =>
                                                        handleSelect(
                                                            regency.name,
                                                            field,
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            value ===
                                                                regency.name
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                    {regency.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
