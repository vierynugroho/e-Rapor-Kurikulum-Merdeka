import { AssessmentAspects, Student_Score, Theme } from '@prisma/client';

export type IndicatorType = {
    id?: number;
    title?: string;
    description?: string;
    assesment_type?: AssessmentAspects;
    themeID?: number | null;
    themeId?: number | null;

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

    createdAt?: Date;
    updatedAt?: Date;

    Theme?: Theme | null;
    Score?: Student_Score[];
};
