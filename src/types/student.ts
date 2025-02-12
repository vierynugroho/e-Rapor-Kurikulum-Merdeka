import {
    DevelopmentLevel,
    Gender,
    Indicator,
    Period,
    Religion,
    Student,
    Teacher,
    Class,
    Reflection,
} from '@prisma/client';

//TODO: Student Score
export type StudentScore = {
    id?: number;
    studentId?: number;
    periodId?: number;
    teacherId?: number;
    indicatorId?: number;
    description?: string;
    value?: DevelopmentLevel | null | undefined;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Teacher?: Teacher | null;
    Indicator?: Indicator | null;
    Period?: Period | null;
};

export type UpsertStudentScore = {
    aspect: string;
    description?: string;
    assessments?: {
        studentId?: number | undefined;
        teacherId?: number | null;
        indicatorId?: number | null;
        periodId?: number | null;
        value?: DevelopmentLevel | null;
    }[];
}[];

//TODO: Student Development
export type StudentDevelopment = {
    id?: number;
    height: number;
    weight: number;
    notes?: string;
    studentID: number;
    teacherID: number;
    recordDate?: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Teacher?: Teacher | null;
};
export type CreateStudentDevelopment = {
    id?: number;
    height?: number;
    weight?: number;
    notes?: string | null | undefined;
    studentID?: number;
    teacherID?: number;
    studentId?: number;
    teacherId?: number;
    periodId?: number;
    periodID?: number;
    recordDate?: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Teacher?: Teacher | null;
};
export type UpdateStudentDevelopment = {
    id?: number;
    height?: number;
    weight?: number;
    notes?: string;
    studentID?: number;
    teacherID?: number;
    periodId?: number;
    periodID?: number;
    recordDate?: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Teacher?: Teacher | null;
};

//TODO: Student Data
export type CreateStudentType = {
    fullname: string;
    gender: Gender;
    religion: Religion;
    parentName: string;
    birthPlace: string;
    birthDate: string | Date;
    classID?: number | null;
    address: string;
    Class?: Class | null;
    id?: number;
};

export type UpdateStudentType = {
    id?: number;
    fullname?: string;
    gender?: Gender;
    religion?: Religion;
    parentName?: string;
    birthPlace?: string;
    birthDate?: string | Date;
    classID?: number | null;
    address?: string;
    Class?: Class | null;
};

export type StudentType = {
    id?: number;
    fullname?: string;
    gender?: Gender;
    religion?: Religion;
    parentName?: string;
    birthPlace?: string;
    birthDate?: string | Date;
    classID?: number;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
    readyToPrint?: boolean;
    filledAssessment?: boolean;
    filledReflection?: boolean;
    Class?: Class | null;
    Score?: StudentScore[];
    Development?: StudentDevelopment[];
    development?: StudentDevelopment[];
    teacherClass?: Teacher;
    Reflection?: Reflection[];
    hasDevelopment?: boolean;
};

//TODO: reflection data
export type ReflectionType = {
    id?: number;
    description?: string | null;
    studentId?: number | undefined;
    teacherId?: number | null;
    periodId?: number | null;
    classId?: number | null;
    classID?: number | null;
    filledReflection?: boolean;

    createdAt?: string | Date;
    updatedAt?: string | Date;

    Student?: Student | null;
    Period?: Period | null;
    Class?: Class | null;
    Teacher?: Teacher | null;
    Reflection?: Reflection;
    reflection?: Reflection;
};
