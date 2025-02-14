import { apiClient } from '@/lib/axios';
import { StudentAttendanceType, StudentType } from '@/types/student';

export const getStudentAttendanceByClass = async () => {
    return apiClient.get<StudentType[]>(`/attendances`);
};

export const upsertStudentAttendance = async (data: StudentAttendanceType) => {
    return apiClient.post<StudentAttendanceType>('/attendances', data);
};
