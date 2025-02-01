import { StudentDevelopment, StudentScore } from './student';

export type UserRole = 'ADMIN' | 'TEACHER';

export type Class = {
    id: number;
    name: string;
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

    role: UserRole;
    Class?: Class | null;
    Score?: StudentScore[];
    Development?: StudentDevelopment[];
};

export type UpdateTeacherType = {
    id?: number;
    fullname?: string;
    email?: string;
    identity_number?: string;
    password?: string;
    classID?: number | null;

    createdAt?: Date;
    updatedAt?: Date;

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

    createdAt?: Date;
    updatedAt?: Date;

    role?: UserRole;
    Class?: Class | null;
    Score?: StudentScore[];
    Development?: StudentDevelopment[];
};
