// stores/dateStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DateState {
    selectedDate: Date | undefined;
    setSelectedDate: (date: Date | undefined) => void;
    clearDate: () => void;
}

// Create store with persisted state
export const useDateStore = create<DateState>()(
    persist(
        set => ({
            selectedDate: new Date(),
            setSelectedDate: date => set({ selectedDate: date }),
            clearDate: () => set({ selectedDate: new Date() }),
        }),
        {
            name: 'date-store',
            storage: createJSONStorage(() => localStorage),
            partialize: state => ({ selectedDate: state.selectedDate }),
        },
    ),
);
