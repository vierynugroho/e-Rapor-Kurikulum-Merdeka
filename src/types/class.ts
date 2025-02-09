import { ClassCategory, Teacher } from '@prisma/client';

export type ClassType = {
    id?: number;
    name?: string;
    category?: ClassCategory;
    Teacher?: Teacher;
    createdAt?: Date;
    updatedAt?: Date;
};

export type UpdateClassType = {
    id?: number;
    name?: string;
    category?: ClassCategory;

    createdAt?: Date;
    updatedAt?: Date;
};

export type CreateClassType = {
    id?: number;
    name: string;
    category: ClassCategory;

    createdAt?: Date;
    updatedAt?: Date;
};
