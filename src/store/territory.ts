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

interface TerritoryStore {
    provinces: Province[];
    regencies: Regency[];
    allRegencies: Regency[];
    districts: District[];
    selectedProvinceId: string | null;
    selectedRegencyId: string | null;
    isLoading: boolean;
    error: string | null;
    fetchProvinces: () => Promise<void>;
    fetchAllRegencies: () => Promise<void>;
    fetchRegencies: (provinceId: string) => Promise<void>;
    fetchDistricts: (regencyId: string) => Promise<void>;
    setSelectedProvinceId: (id: string | null) => void;
    setSelectedRegencyId: (id: string | null) => void;
}

export const useTerritoryStore = create<TerritoryStore>((set, get) => ({
    provinces: [],
    regencies: [],
    districts: [],
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
            const regencies = await indonesia.getAllRegencies(provinceId);
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
            const districts = await indonesia.getAllDistricts(regencyId);
            set({ districts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch districts', isLoading: false });
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
