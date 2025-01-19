/* eslint-disable @typescript-eslint/no-unused-vars */
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

const TerritoryForm = ({ control }) => {
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegency, setSelectedRegency] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch(
                    'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json',
                );
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchRegencies = async () => {
            if (!selectedProvince) {
                setRegencies([]);
                return;
            }
            try {
                const response = await fetch(
                    `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`,
                );
                const data = await response.json();
                setRegencies(data);
            } catch (error) {
                console.error('Error fetching regencies:', error);
            }
        };
        fetchRegencies();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedRegency) {
                setDistricts([]);
                return;
            }
            try {
                const response = await fetch(
                    `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`,
                );
                const data = await response.json();
                setDistricts(data);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchDistricts();
    }, [selectedRegency]);

    useEffect(() => {
        const fetchVillages = async () => {
            if (!selectedDistrict) {
                setVillages([]);
                return;
            }
            try {
                const response = await fetch(
                    `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`,
                );
                const data = await response.json();
                setVillages(data);
            } catch (error) {
                console.error('Error fetching villages:', error);
            }
        };
        fetchVillages();
    }, [selectedDistrict]);

    return (
        <FormField
            control={control}
            name="address"
            render={() => (
                <FormItem className="flex flex-col">
                    <Card className="w-full bg-black">
                        <CardContent className="space-y-4 p-6">
                            <h2 className="mb-4 text-lg font-semibold">
                                Alamat
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="province"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel htmlFor="province">
                                                Provinsi
                                            </FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button className="w-full rounded border px-4 py-2 text-left">
                                                            {selectedProvince
                                                                ? provinces.find(
                                                                      p =>
                                                                          p.id ===
                                                                          selectedProvince,
                                                                  )?.name
                                                                : 'Pilih provinsi...'}
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
                                                                                setSelectedProvince(
                                                                                    province.id,
                                                                                );
                                                                                setSelectedRegency(
                                                                                    '',
                                                                                );
                                                                                setSelectedDistrict(
                                                                                    '',
                                                                                );
                                                                                setSelectedVillage(
                                                                                    '',
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
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="regency"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel htmlFor="regency">
                                                Kabupaten
                                            </FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button
                                                            className="w-full rounded border px-4 py-2 text-left"
                                                            disabled={
                                                                !selectedProvince
                                                            }
                                                        >
                                                            {selectedRegency
                                                                ? regencies.find(
                                                                      r =>
                                                                          r.id ===
                                                                          selectedRegency,
                                                                  )?.name
                                                                : 'Pilih kabupaten...'}
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
                                                                                setSelectedRegency(
                                                                                    regency.id,
                                                                                );
                                                                                setSelectedDistrict(
                                                                                    '',
                                                                                );
                                                                                setSelectedVillage(
                                                                                    '',
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
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel htmlFor="district">
                                                Kecamatan
                                            </FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button
                                                            className="w-full rounded border px-4 py-2 text-left"
                                                            disabled={
                                                                !selectedRegency
                                                            }
                                                        >
                                                            {selectedDistrict
                                                                ? districts.find(
                                                                      d =>
                                                                          d.id ===
                                                                          selectedDistrict,
                                                                  )?.name
                                                                : 'Pilih kecamatan...'}
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
                                                                                setSelectedDistrict(
                                                                                    district.id,
                                                                                );
                                                                                setSelectedVillage(
                                                                                    '',
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
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="village"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel htmlFor="village">
                                                Desa
                                            </FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button
                                                            className="w-full rounded border px-4 py-2 text-left"
                                                            disabled={
                                                                !selectedDistrict
                                                            }
                                                        >
                                                            {selectedVillage
                                                                ? villages.find(
                                                                      v =>
                                                                          v.id ===
                                                                          selectedVillage,
                                                                  )?.name
                                                                : 'Pilih desa...'}
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
                                                                                setSelectedVillage(
                                                                                    village.id,
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
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </FormItem>
            )}
        />
    );
};

export default TerritoryForm;
