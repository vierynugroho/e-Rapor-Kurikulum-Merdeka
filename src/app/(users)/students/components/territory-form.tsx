import React, { useEffect } from 'react';
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
    const {
        provinces,
        regencies,
        districts,
        villages,
        fetchProvinces,
        fetchRegencies,
        fetchDistricts,
        fetchVillages,
        selectedProvinceId,
        selectedRegencyId,
        setSelectedProvinceId,
        setSelectedRegencyId,
    } = useTerritoryStore();

    useEffect(() => {
        fetchProvinces();
    }, [fetchProvinces]);

    return (
        <FormField
            control={control}
            name={name} // Parent field name (e.g., "address")
            render={({ field }) => (
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
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full rounded border px-4 py-2 text-left"
                                                >
                                                    {field.value?.province
                                                        ?.name ||
                                                        'Pilih provinsi...'}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent>
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
                                                                        setSelectedProvinceId(
                                                                            province.id,
                                                                        );
                                                                        field.onChange(
                                                                            {
                                                                                ...field.value,
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
                                                                            },
                                                                        );
                                                                        setSelectedRegencyId(
                                                                            null,
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                                {/* Kabupaten */}
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="regency">
                                        Kabupaten
                                    </FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full rounded border px-4 py-2 text-left"
                                                    disabled={
                                                        !selectedProvinceId
                                                    }
                                                >
                                                    {field.value?.regency
                                                        ?.name ||
                                                        'Pilih kabupaten...'}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent>
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
                                                                        setSelectedRegencyId(
                                                                            regency.id,
                                                                        );
                                                                        field.onChange(
                                                                            {
                                                                                ...field.value,
                                                                                regency:
                                                                                    {
                                                                                        id: regency.id,
                                                                                        name: regency.name,
                                                                                    },
                                                                                district:
                                                                                    null,
                                                                                village:
                                                                                    null,
                                                                            },
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                                {/* Kecamatan */}
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="district">
                                        Kecamatan
                                    </FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full rounded border px-4 py-2 text-left"
                                                    disabled={
                                                        !selectedRegencyId
                                                    }
                                                >
                                                    {field.value?.district
                                                        ?.name ||
                                                        'Pilih kecamatan...'}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent>
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
                                                                        field.onChange(
                                                                            {
                                                                                ...field.value,
                                                                                district:
                                                                                    {
                                                                                        id: district.id,
                                                                                        name: district.name,
                                                                                    },
                                                                                village:
                                                                                    null,
                                                                            },
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                                {/* Desa */}
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="village">
                                        Desa
                                    </FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="w-full rounded border px-4 py-2 text-left"
                                                    disabled={!districts.length}
                                                >
                                                    {field.value?.village
                                                        ?.name ||
                                                        'Pilih desa...'}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent>
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
                                                                        field.onChange(
                                                                            {
                                                                                ...field.value,
                                                                                village:
                                                                                    {
                                                                                        id: village.id,
                                                                                        name: village.name,
                                                                                    },
                                                                            },
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
                                    </FormControl>
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
