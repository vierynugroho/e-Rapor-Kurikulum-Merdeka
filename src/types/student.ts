import {
    DevelopmentLevel,
    Gender,
    Indicator,
    Period,
    Religion,
    Student,
    Teacher,
} from '@prisma/client';
import { Class } from './teacher';

//TODO: Student Score
export type StudentScore = {
    id?: number;
    studentId?: number;
    periodId?: number;
    teacherId?: number;
    indicatorId?: number;
    description?: string;
    value?: DevelopmentLevel;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Teacher?: Teacher | null;
    Indicator?: Indicator | null;
    Period?: Period | null;
};

//TODO: Student Development
export type StudentDevelopment = {
    id?: number;
    height: number;
    weight: number;
    notes?: string;
    studentID: number;
    teacherID: number;
    recordDate?: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Teacher?: Teacher | null;
};
export type CreateStudentDevelopment = {
    id?: number;
    height: number;
    weight: number;
    notes: string;
    studentID?: number;
    teacherID?: number;
    recordDate?: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Teacher?: Teacher | null;
};
export type UpdateStudentDevelopment = {
    id?: number;
    height?: number;
    weight?: number;
    notes?: string;
    studentID?: number;
    teacherID?: number;
    recordDate?: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Teacher?: Teacher | null;
};

//TODO: Student Data
export type CreateStudentType = {
    fullname: string;
    gender: Gender;
    religion: Religion;
    parentName: string;
    birthPlace: string;
    birthDate: string | Date;
    classID?: number | null;
    address: string;
    Class?: Class | null;
    id?: number;
};

export type UpdateStudentType = {
    id?: number;
    fullname?: string;
    gender?: Gender;
    religion?: Religion;
    parentName?: string;
    birthPlace?: string;
    birthDate?: string | Date;
    classID?: number | null;
    address?: string;
    Class?: Class | null;
};

export type StudentType = {
    id?: number;
    fullname?: string;
    gender?: Gender;
    religion?: Religion;
    parentName?: string;
    birthPlace?: string;
    birthDate?: string | Date;
    classID?: number;
    address?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Class?: Class | null;
    Score?: StudentScore[];
    Development?: StudentDevelopment[];
};
