import { AssessmentAspects, Student_Score, Theme } from '@prisma/client';

export type IndicatorType = {
    id?: number;
    title?: string;
    description?: string;
    assesment_type?: AssessmentAspects;
    themeID?: number | null;

    createdAt?: Date;
    updatedAt?: Date;

    theme?: Theme | null;
    studentScores?: Student_Score[];
};

export type UpdateIndicatorType = {
    id?: number;
    title?: string;
    description?: string;
    assesment_type?: AssessmentAspects;
    themeID?: number | null;

    createdAt?: Date;
    updatedAt?: Date;

    theme?: Theme | null;
    studentScores?: Student_Score[];
};

export type CreateIndicatorType = {
    id?: number;
    title: string;
    description: string;
    assesment_type: AssessmentAspects;
    themeID?: number | null;

    createdAt?: Date;
    updatedAt?: Date;

    theme?: Theme | null;
    studentScores?: Student_Score[];
};
