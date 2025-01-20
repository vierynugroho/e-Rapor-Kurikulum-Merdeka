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

const TerritoryForm = ({ control, name }) => {
    // Local state to track current selections
    const [currentSelections, setCurrentSelections] = useState({
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

    // Helper function to format address string
    const formatAddress = (village, district, regency, province) => {
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
            render={({ field }) => {
                return (
                    <FormItem className="flex flex-col">
                        <Card className="w-full bg-black">
                            <CardContent className="space-y-4 p-6">
                                <h2 className="mb-4 text-lg font-semibold">
                                    Alamat
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
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
                                                        className="w-full rounded border px-4 py-2 text-left"
                                                    >
                                                        {currentSelections
                                                            .province?.name ||
                                                            'Pilih provinsi...'}
                                                    </button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Cari provinsi..." />
                                                    <CommandList>
                                                        {provinces.map(
                                                            province => (
                                                                <CommandItem
                                                                    key={
                                                                        province.id
                                                                    }
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
                                                                    {
                                                                        province.name
                                                                    }
                                                                </CommandItem>
                                                            ),
                                                        )}
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
                                                        className="w-full rounded border px-4 py-2 text-left"
                                                        disabled={
                                                            !currentSelections.province
                                                        }
                                                    >
                                                        {currentSelections
                                                            .regency?.name ||
                                                            'Pilih kabupaten...'}
                                                    </button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Cari kabupaten..." />
                                                    <CommandList>
                                                        {regencies.map(
                                                            regency => (
                                                                <CommandItem
                                                                    key={
                                                                        regency.id
                                                                    }
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
                                                                    {
                                                                        regency.name
                                                                    }
                                                                </CommandItem>
                                                            ),
                                                        )}
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
                                                        className="w-full rounded border px-4 py-2 text-left"
                                                        disabled={
                                                            !currentSelections.regency
                                                        }
                                                    >
                                                        {currentSelections
                                                            .district?.name ||
                                                            'Pilih kecamatan...'}
                                                    </button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Cari kecamatan..." />
                                                    <CommandList>
                                                        {districts.map(
                                                            district => (
                                                                <CommandItem
                                                                    key={
                                                                        district.id
                                                                    }
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
                                                                    {
                                                                        district.name
                                                                    }
                                                                </CommandItem>
                                                            ),
                                                        )}
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
                                                        className="w-full rounded border px-4 py-2 text-left"
                                                        disabled={
                                                            !currentSelections.district
                                                        }
                                                    >
                                                        {currentSelections
                                                            .village?.name ||
                                                            'Pilih desa...'}
                                                    </button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Cari desa..." />
                                                    <CommandList>
                                                        {villages.map(
                                                            village => (
                                                                <CommandItem
                                                                    key={
                                                                        village.id
                                                                    }
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
                                                                    {
                                                                        village.name
                                                                    }
                                                                </CommandItem>
                                                            ),
                                                        )}
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
                );
            }}
        />
    );
};

export default TerritoryForm;
