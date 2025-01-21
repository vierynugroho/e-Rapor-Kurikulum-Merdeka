import React, { useEffect, useState } from 'react';
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useTerritoryStore } from '@/store/territory';

interface TerritoryItem {
    id: string | number;
    name: string;
}

interface Selections {
    province: TerritoryItem | null;
    regency: TerritoryItem | null;
    district: TerritoryItem | null;
    village: TerritoryItem | null;
}

const TerritoryForm = ({ control, name, label }) => {
    const [currentSelections, setCurrentSelections] = useState<Selections>({
        province: null,
        regency: null,
        district: null,
        village: null,
    });

    const {
        provinces,
        regencies,
        districts,
        villages,
        fetchProvinces,
        fetchRegencies,
        fetchDistricts,
        fetchVillages,
    } = useTerritoryStore();

    useEffect(() => {
        fetchProvinces();
    }, [fetchProvinces]);

    const formatAddress = (
        village: TerritoryItem | null,
        district: TerritoryItem | null,
        regency: TerritoryItem | null,
        province: TerritoryItem | null,
    ): string => {
        const parts = [
            village?.name,
            district?.name,
            regency?.name,
            province?.name,
        ].filter(Boolean);
        return parts.join(', ');
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Card className="w-full">
                        <CardContent className="p-4 md:p-6">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {/* Provinsi */}
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="province">
                                        Provinsi
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <button
                                                    type="button"
                                                    className="w-full truncate rounded border px-3 py-2 text-left text-sm"
                                                >
                                                    {currentSelections.province
                                                        ?.name ||
                                                        'Pilih provinsi...'}
                                                </button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full max-w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari provinsi..." />
                                                <CommandList className="max-h-48 overflow-y-auto">
                                                    {provinces.map(province => (
                                                        <CommandItem
                                                            key={province.id}
                                                            onSelect={() => {
                                                                const newSelections =
                                                                    {
                                                                        province:
                                                                            {
                                                                                id: province.id,
                                                                                name: province.name,
                                                                            },
                                                                        regency:
                                                                            null,
                                                                        district:
                                                                            null,
                                                                        village:
                                                                            null,
                                                                    };
                                                                setCurrentSelections(
                                                                    newSelections,
                                                                );
                                                                field.onChange(
                                                                    formatAddress(
                                                                        null,
                                                                        null,
                                                                        null,
                                                                        newSelections.province,
                                                                    ),
                                                                );
                                                                fetchRegencies(
                                                                    province.id,
                                                                );
                                                            }}
                                                        >
                                                            {province.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>

                                {/* Kabupaten */}
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="regency">
                                        Kabupaten
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <button
                                                    type="button"
                                                    className="w-full truncate rounded border px-3 py-2 text-left text-sm"
                                                    disabled={
                                                        !currentSelections.province
                                                    }
                                                >
                                                    {currentSelections.regency
                                                        ?.name ||
                                                        'Pilih kabupaten...'}
                                                </button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full max-w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari kabupaten..." />
                                                <CommandList className="max-h-48 overflow-y-auto">
                                                    {regencies.map(regency => (
                                                        <CommandItem
                                                            key={regency.id}
                                                            onSelect={() => {
                                                                const newSelections =
                                                                    {
                                                                        ...currentSelections,
                                                                        regency:
                                                                            {
                                                                                id: regency.id,
                                                                                name: regency.name,
                                                                            },
                                                                        district:
                                                                            null,
                                                                        village:
                                                                            null,
                                                                    };
                                                                setCurrentSelections(
                                                                    newSelections,
                                                                );
                                                                field.onChange(
                                                                    formatAddress(
                                                                        null,
                                                                        null,
                                                                        newSelections.regency,
                                                                        currentSelections.province,
                                                                    ),
                                                                );
                                                                fetchDistricts(
                                                                    regency.id,
                                                                );
                                                            }}
                                                        >
                                                            {regency.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>

                                {/* Kecamatan */}
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="district">
                                        Kecamatan
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <button
                                                    type="button"
                                                    className="w-full truncate rounded border px-3 py-2 text-left text-sm"
                                                    disabled={
                                                        !currentSelections.regency
                                                    }
                                                >
                                                    {currentSelections.district
                                                        ?.name ||
                                                        'Pilih kecamatan...'}
                                                </button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full max-w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari kecamatan..." />
                                                <CommandList className="max-h-48 overflow-y-auto">
                                                    {districts.map(district => (
                                                        <CommandItem
                                                            key={district.id}
                                                            onSelect={() => {
                                                                const newSelections =
                                                                    {
                                                                        ...currentSelections,
                                                                        district:
                                                                            {
                                                                                id: district.id,
                                                                                name: district.name,
                                                                            },
                                                                        village:
                                                                            null,
                                                                    };
                                                                setCurrentSelections(
                                                                    newSelections,
                                                                );
                                                                field.onChange(
                                                                    formatAddress(
                                                                        null,
                                                                        newSelections.district,
                                                                        currentSelections.regency,
                                                                        currentSelections.province,
                                                                    ),
                                                                );
                                                                fetchVillages(
                                                                    district.id,
                                                                );
                                                            }}
                                                        >
                                                            {district.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>

                                {/* Desa */}
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="village">
                                        Desa
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <button
                                                    type="button"
                                                    className="w-full truncate rounded border px-3 py-2 text-left text-sm"
                                                    disabled={
                                                        !currentSelections.district
                                                    }
                                                >
                                                    {currentSelections.village
                                                        ?.name ||
                                                        'Pilih desa...'}
                                                </button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full max-w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari desa..." />
                                                <CommandList className="max-h-48 overflow-y-auto">
                                                    {villages.map(village => (
                                                        <CommandItem
                                                            key={village.id}
                                                            onSelect={() => {
                                                                const newSelections =
                                                                    {
                                                                        ...currentSelections,
                                                                        village:
                                                                            {
                                                                                id: village.id,
                                                                                name: village.name,
                                                                            },
                                                                    };
                                                                setCurrentSelections(
                                                                    newSelections,
                                                                );
                                                                field.onChange(
                                                                    formatAddress(
                                                                        newSelections.village,
                                                                        currentSelections.district,
                                                                        currentSelections.regency,
                                                                        currentSelections.province,
                                                                    ),
                                                                );
                                                            }}
                                                        >
                                                            {village.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            </div>
                        </CardContent>
                    </Card>
                </FormItem>
            )}
        />
    );
};

export default TerritoryForm;
