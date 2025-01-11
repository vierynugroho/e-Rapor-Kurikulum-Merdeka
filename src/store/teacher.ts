// stores/teacherStore.ts
import { UserRole } from '@prisma/client';
import { create } from 'zustand';

// Interface untuk data Teacher
interface ITeacher {
    id: number;
    fullname: string;
    email: string;
    identity_number: string;
    password: string;
    classID?: number;
    createdAt?: Date;
    updateAt?: Date;
    role: UserRole;
}

// Interface untuk update data partial
interface ITeacherUpdate {
    fullname?: string;
    email?: string;
    identity_number?: string;
    password?: string;
    classID?: number;
    role?: UserRole;
}

interface ITeacherStore {
    // State
    teachers: ITeacher[];
    selectedTeacher: ITeacher | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    setTeachers: (teachers: ITeacher[]) => void;
    addTeacher: (
        teacher: Omit<ITeacher, 'id' | 'createdAt' | 'updateAt'>,
    ) => void;
    updateTeacher: (id: number, updateData: ITeacherUpdate) => void;
    deleteTeacher: (id: number) => void;
    setSelectedTeacher: (teacher: ITeacher | null) => void;
    setLoading: (status: boolean) => void;
    setError: (error: string | null) => void;
    getTeacherByClass: (classId: number) => ITeacher | null;
    getTeacherById: (id: number) => ITeacher | null;
}

export const useTeacherStore = create<ITeacherStore>((set, get) => ({
    // Initial state
    teachers: [],
    selectedTeacher: null,
    isLoading: false,
    error: null,

    // Actions
    setTeachers: teachers => set({ teachers }),

    addTeacher: teacherData => {
        const newTeacher: ITeacher = {
            id: Date.now(), // Temporary ID (should be handled by backend)
            createdAt: new Date(),
            updateAt: new Date(),
            ...teacherData,
        };

        set(state => ({
            teachers: [...state.teachers, newTeacher],
        }));
    },

    updateTeacher: (id, updateData) =>
        set(state => ({
            teachers: state.teachers.map(teacher =>
                teacher.id === id
                    ? {
                          ...teacher,
                          ...updateData,
                          updateAt: new Date(),
                      }
                    : teacher,
            ),
        })),

    deleteTeacher: id =>
        set(state => ({
            teachers: state.teachers.filter(teacher => teacher.id !== id),
        })),

    setSelectedTeacher: teacher => set({ selectedTeacher: teacher }),

    setLoading: status => set({ isLoading: status }),

    setError: error => set({ error }),

    getTeacherByClass: classId => {
        const state = get();
        return (
            state.teachers.find(teacher => teacher.classID === classId) || null
        );
    },

    getTeacherById: id => {
        const state = get();
        return state.teachers.find(teacher => teacher.id === id) || null;
    },
}));
