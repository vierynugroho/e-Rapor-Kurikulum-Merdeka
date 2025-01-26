export type ThemeType = {
    id?: number;
    title?: string;

    createdAt?: Date;
    updatedAt?: Date;

    indicator?: [];
};

export type UpdateThemeType = {
    id?: number;
    title?: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export type CreateThemeType = {
    id?: number;
    title: string;

    createdAt?: Date;
    updatedAt?: Date;
};
