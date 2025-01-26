export type ClassType = {
    id?: number;
    name?: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export type UpdateClassType = {
    id?: number;
    name?: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export type CreateClassType = {
    id?: number;
    name: string;

    createdAt?: Date;
    updatedAt?: Date;
};
