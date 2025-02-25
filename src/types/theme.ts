export type ThemeType = {
    id?: number;
    title?: string;

    createdAt?: Date;
    updatedAt?: Date;

    Indicator?: [];
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
