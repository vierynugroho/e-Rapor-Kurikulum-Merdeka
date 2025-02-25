import { ClassCategory, UserPosition } from '@prisma/client';
import { StudentDevelopment, StudentScore } from './student';

export type UserRole = 'ADMIN' | 'TEACHER';

export type Class = {
    id: number;
    name: string;
    category: ClassCategory;
};

export type CreateTeacherType = {
    id?: number;
    fullname: string;
    email: string;
    identity_number: string;
    password: string;
    classID?: number | null;

    createdAt?: Date;
    updatedAt?: Date;

    position: UserPosition;
    role: UserRole;
    Class?: Class | null;
    Score?: StudentScore[];
    Development?: StudentDevelopment[];
};

export type UpdateTeacherType = {
    id?: number;
    fullname?: string;
    email?: string | null;
    identity_number?: string;
    password?: string;
    classID?: number | null;

    createdAt?: Date;
    updatedAt?: Date;

    position?: UserPosition;
    role?: UserRole;
    Class?: Class | null;
    Score?: StudentScore[];
    Development?: StudentDevelopment[];
};

export type TeacherType = {
    id?: number;
    fullname?: string;
    email?: string;
    identity_number?: string;
    password?: string;
    classID?: number | null;
    position?: UserPosition;

    createdAt?: Date;
    updatedAt?: Date;

    role?: UserRole;
    Class?: Class | null;
    Score?: StudentScore[];
    Development?: StudentDevelopment[];
};
