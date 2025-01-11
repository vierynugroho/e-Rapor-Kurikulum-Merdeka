import { DevelopmentLevel, Gender } from '@prisma/client';

export interface IStudent {
    id: number;
    fullname: string;
    gender: Gender;
    religion?: string;
    parentName?: string;
    birthPlace: string;
    birthDate: Date;
    classID?: number;
    address?: string;
    createdAt: Date;
    updateAt: Date;
}

export interface IStudentScore {
    id: number;
    studentId: number;
    periodId: number;
    teacherId: number;
    indicatorId?: number;
    description?: string;
    value: DevelopmentLevel;
    createdAt: Date;
    updateAt: Date;
}

export interface IStudentDevelopment {
    id: number;
    height?: number;
    weight?: number;
    notes?: string;
    studentId: number;
    teacherId: number;
    recordDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IStudentUpdate {
    fullname?: string;
    gender?: Gender;
    religion?: string;
    parentName?: string;
    birthPlace?: string;
    birthDate?: Date;
    classID?: number;
    address?: string;
}
