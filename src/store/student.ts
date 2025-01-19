import { StudentType } from '@/types/student';
import { create } from 'zustand';

type StudentStore = {
    selectedStudent: StudentType | null;
    students: StudentType[];
    setSelectedStudent: (student: StudentType | null) => void;
    setStudents: (students: StudentType[]) => void;
    updateStudent: (updatedStudent: StudentType) => void;
    deleteStudent: (studentId: number) => void;
};

export const useStudentStore = create<StudentStore>(set => ({
    selectedStudent: null,
    students: [],

    setSelectedStudent: student => set({ selectedStudent: student }),

    setStudents: students => set({ students }),

    updateStudent: updatedStudent =>
        set(state => ({
            students: state.students.map(student =>
                student.id === updatedStudent.id ? updatedStudent : student,
            ),
            selectedStudent:
                state.selectedStudent?.id === updatedStudent.id
                    ? updatedStudent
                    : state.selectedStudent,
        })),

    deleteStudent: studentId =>
        set(state => ({
            students: state.students.filter(
                student => student.id !== studentId,
            ),
            selectedStudent:
                state.selectedStudent?.id === studentId
                    ? null
                    : state.selectedStudent,
        })),
}));
