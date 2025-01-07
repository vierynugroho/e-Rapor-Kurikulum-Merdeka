export type UserRole = 'ADMIN' | 'TEACHER';

export type Class = {
    id: number;
    name: string;
};

export type Student_Score = {
    id: number;
    studentId: number;
    teacherId: number;
    score: number;
};

export type Student_Development = {
    id: number;
    studentId: number;
    teacherId: number;
    developmentDetails: string;
};

export type Teacher = {
    id: number;
    fullname: string;
    email: string;
    nip: string;
    password: string;
    classID?: number | null;

    createdAt: Date;
    updateAt: Date;

    role: UserRole;
    class?: Class | null;
    Student_Score?: Student_Score[];
    Student_Development?: Student_Development[];
};
