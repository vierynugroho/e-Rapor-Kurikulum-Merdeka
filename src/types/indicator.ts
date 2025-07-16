import {
    AssessmentAspects,
    ClassCategory,
    Student_Score,
    Theme,
} from '@prisma/client';

export type IndicatorType = {
    id?: number;
    title?: string;
    description?: string;
    assesment_type?: AssessmentAspects;
    themeID?: number | null;
    themeId?: number | null;
    classCategory?: ClassCategory;

    createdAt?: Date;
    updatedAt?: Date;

    Theme?: Theme | null;
    Score?: Student_Score[];
};

export type UpdateIndicatorType = {
    id?: number;
    title?: string;
    description?: string;
    assesment_type?: AssessmentAspects;
    themeID?: number | null;
    classCategory?: ClassCategory;

    createdAt?: Date;
    updatedAt?: Date;

    Theme?: Theme | null;
    Score?: Student_Score[];
};

export type CreateIndicatorType = {
    id?: number;
    title: string;
    description: string;
    assesment_type: AssessmentAspects;
    themeID?: number | null;
    classCategory: ClassCategory;

    createdAt?: Date;
    updatedAt?: Date;

    Theme?: Theme | null;
    Score?: Student_Score[];
};
