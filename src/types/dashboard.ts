export interface ActivePeriod {
    id: number;
    semester: string;
    year: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Clas {
    id: number;
    name: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface _count {
    Score: number;
    Development: number;
    Reflection: number;
    Attendance: number;
}

export interface UserData {
    id: number;
    fullname: string;
    email: string;
    identity_number: string;
    password: string;
    classID: number | null;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    position: string;
    Class: Clas | null;
    _count: _count;
}

export type DashboardType = {
    totalStudent: number;
    totalTeacher: number;
    totalIndicator: number;
    totalThemes: number;
    totalClass: number;
    activePeriod: ActivePeriod | null;
    userData: UserData;
};
