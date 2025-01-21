// store/useTerritoryStore.ts
import { create } from 'zustand';
import indonesia from 'territory-indonesia';

interface Province {
    id: string;
    name: string;
    alt_name: string;
    latitude: number;
    longitude: number;
    uuid: string;
}

interface Regency {
    id: string;
    province_id: string;
    name: string;
    alt_name: string;
    latitude: number;
    longitude: number;
    uuid: string;
}

interface District {
    id: string;
    regency_id: string;
    name: string;
    alt_name: string;
    latitude: number;
    longitude: number;
    uuid: string;
}

interface Village {
    id: string;
    district_id: string;
    name: string;
    alt_name: string;
    latitude: number;
    longitude: number;
    uuid: string;
}

interface TerritoryStore {
    provinces: Province[];
    regencies: Regency[];
    villages: Village[];
    allRegencies: Regency[];
    districts: District[];
    selectedProvinceId: string | null;
    selectedRegencyId: string | null;
    isLoading: boolean;
    error: string | null;
    fetchProvinces: () => Promise<void>;
    fetchAllRegencies: () => Promise<void>;
    fetchVillages: (districtId: string) => Promise<void>;
    fetchRegencies: (provinceId: string) => Promise<void>;
    fetchDistricts: (regencyId: string) => Promise<void>;
    setSelectedProvinceId: (id: string | null) => void;
    setSelectedRegencyId: (id: string | null) => void;
}

export const useTerritoryStore = create<TerritoryStore>((set, get) => ({
    provinces: [],
    regencies: [],
    districts: [],
    villages: [],
    allRegencies: [],
    selectedProvinceId: null,
    selectedRegencyId: null,
    isLoading: false,
    error: null,

    fetchProvinces: async () => {
        set({ isLoading: true, error: null });
        try {
            const provinces = await indonesia.getAllProvinces();
            set({ provinces, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch provinces', isLoading: false });
            console.log(error);
        }
    },

    fetchRegencies: async (provinceId: string) => {
        set({ isLoading: true, error: null });
        try {
            const regencies =
                await indonesia.getRegenciesOfProvinceId(provinceId);
            set({ regencies, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch regencies', isLoading: false });
            console.log(error);
        }
    },

    fetchAllRegencies: async () => {
        set({ isLoading: true, error: null });
        try {
            const allRegencies = await indonesia.getAllRegencies();
            set({ allRegencies, isLoading: false });
        } catch (error) {
            console.error('Error fetching regencies:', error);
            set({
                error: 'Gagal mengambil data wilayah',
                isLoading: false,
                allRegencies: [],
            });
        }
    },

    fetchDistricts: async (regencyId: string) => {
        set({ isLoading: true, error: null });
        try {
            const districts =
                await indonesia.getDistrictsOfRegencyId(regencyId);
            set({ districts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch districts', isLoading: false });
            console.log(error);
        }
    },

    fetchVillages: async (districtId: string) => {
        set({ isLoading: true, error: null });
        try {
            const villages =
                await indonesia.getVillagesOfDistrictId(districtId);
            set({ villages, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch villages', isLoading: false });
            console.log(error);
        }
    },

    setSelectedProvinceId: (id: string | null) => {
        set({ selectedProvinceId: id, selectedRegencyId: null, districts: [] });
        if (id) {
            get().fetchRegencies(id);
        } else {
            set({ regencies: [] });
        }
    },

    setSelectedRegencyId: (id: string | null) => {
        set({ selectedRegencyId: id });
        if (id) {
            get().fetchDistricts(id);
        } else {
            set({ districts: [] });
        }
    },
}));
