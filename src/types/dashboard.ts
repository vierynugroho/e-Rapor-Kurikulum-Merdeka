export interface ActivePeriod {
    id: number;
    semester: string;
    year: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Clas {
    id: number;
    name: string;
    category: string;
    createdAt: string;
    updatedAt: string;
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
    classID: number;
    createdAt: string;
    updatedAt: string;
    role: string;
    position: string;
    Class: Clas;
    _count: _count;
}

export type DashboardType = {
    totalStudent: number;
    totalTeacher: number;
    totalIndicator: number;
    totalThemes: number;
    totalClass: number;
    activePeriod: ActivePeriod;
    userData: UserData;
};
