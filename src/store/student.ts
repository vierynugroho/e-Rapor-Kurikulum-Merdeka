// stores/studentStore.ts
import {
    IStudent,
    IStudentDevelopment,
    IStudentScore,
    IStudentUpdate,
} from '@/types/student';
import { DevelopmentLevel } from '@prisma/client';
import { create } from 'zustand';

interface IStudentStore {
    // State
    students: IStudent[];
    selectedStudent: IStudent | null;
    studentScores: IStudentScore[];
    studentDevelopments: IStudentDevelopment[];
    isLoading: boolean;
    error: string | null;

    // Student Actions
    setStudents: (students: IStudent[]) => void;
    addStudent: (
        student: Omit<IStudent, 'id' | 'createdAt' | 'updateAt'>,
    ) => void;
    updateStudent: (id: number, updateData: IStudentUpdate) => void;
    deleteStudent: (id: number) => void;
    setSelectedStudent: (student: IStudent | null) => void;

    // Score Actions
    addStudentScore: (
        score: Omit<IStudentScore, 'id' | 'createdAt' | 'updateAt'>,
    ) => void;
    updateStudentScore: (
        id: number,
        value: DevelopmentLevel,
        description?: string,
    ) => void;
    getStudentScores: (studentId: number) => IStudentScore[];

    // Development Actions
    addDevelopment: (
        development: Omit<
            IStudentDevelopment,
            'id' | 'createdAt' | 'updatedAt'
        >,
    ) => void;
    updateDevelopment: (
        id: number,
        data: { height?: number; weight?: number; notes?: string },
    ) => void;
    getDevelopmentHistory: (studentId: number) => IStudentDevelopment[];

    // Utility Actions
    setLoading: (status: boolean) => void;
    setError: (error: string | null) => void;
    getStudentsByClass: (classId: number) => IStudent[];
    getStudentById: (id: number) => IStudent | null;
}

export const useStudentStore = create<IStudentStore>((set, get) => ({
    // Initial state
    students: [],
    selectedStudent: null,
    studentScores: [],
    studentDevelopments: [],
    isLoading: false,
    error: null,

    // Student Actions
    setStudents: students => set({ students }),

    addStudent: studentData => {
        const newStudent: IStudent = {
            id: Date.now(),
            createdAt: new Date(),
            updateAt: new Date(),
            ...studentData,
        };

        set(state => ({
            students: [...state.students, newStudent],
        }));
    },

    updateStudent: (id, updateData) =>
        set(state => ({
            students: state.students.map(student =>
                student.id === id
                    ? {
                          ...student,
                          ...updateData,
                          updateAt: new Date(),
                      }
                    : student,
            ),
        })),

    deleteStudent: id =>
        set(state => ({
            students: state.students.filter(student => student.id !== id),
            // Also delete related scores and developments
            studentScores: state.studentScores.filter(
                score => score.studentId !== id,
            ),
            studentDevelopments: state.studentDevelopments.filter(
                dev => dev.studentId !== id,
            ),
        })),

    setSelectedStudent: student => set({ selectedStudent: student }),

    // Score Actions
    addStudentScore: scoreData => {
        const newScore: IStudentScore = {
            id: Date.now(),
            createdAt: new Date(),
            updateAt: new Date(),
            ...scoreData,
        };

        set(state => ({
            studentScores: [...state.studentScores, newScore],
        }));
    },

    updateStudentScore: (id, value, description) =>
        set(state => ({
            studentScores: state.studentScores.map(score =>
                score.id === id
                    ? {
                          ...score,
                          value,
                          description,
                          updateAt: new Date(),
                      }
                    : score,
            ),
        })),

    getStudentScores: studentId => {
        const state = get();
        return state.studentScores.filter(
            score => score.studentId === studentId,
        );
    },

    // Development Actions
    addDevelopment: developmentData => {
        const newDevelopment: IStudentDevelopment = {
            id: Date.now(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...developmentData,
        };

        set(state => ({
            studentDevelopments: [...state.studentDevelopments, newDevelopment],
        }));
    },

    updateDevelopment: (id, data) =>
        set(state => ({
            studentDevelopments: state.studentDevelopments.map(dev =>
                dev.id === id
                    ? {
                          ...dev,
                          ...data,
                          updatedAt: new Date(),
                      }
                    : dev,
            ),
        })),

    getDevelopmentHistory: studentId => {
        const state = get();
        return state.studentDevelopments.filter(
            dev => dev.studentId === studentId,
        );
    },

    // Utility Actions
    setLoading: status => set({ isLoading: status }),
    setError: error => set({ error }),

    getStudentsByClass: classId => {
        const state = get();
        return state.students.filter(student => student.classID === classId);
    },

    getStudentById: id => {
        const state = get();
        return state.students.find(student => student.id === id) || null;
    },
}));
