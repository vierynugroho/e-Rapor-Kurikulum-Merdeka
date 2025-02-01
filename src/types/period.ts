import { Semester } from '@prisma/client';

export type PeriodType = {
    id?: number;
    semester?: Semester;
    year?: string;
    isActive?: boolean;
    Score?: [];
    createdAt?: Date;
    updatedAt?: Date;
};

export type UpdatePeriodType = {
    id?: number;
    semester?: Semester;
    year?: string;
    isActive?: boolean;
    Score?: [];
    createdAt?: Date;
    updatedAt?: Date;
};

export type CreatePeriodType = {
    id?: number;
    semester: Semester;
    year: string;
    isActive: boolean;
    Score?: [];
    createdAt?: Date;
    updatedAt?: Date;
};
