import axios from 'axios';
import api from '@/lib/axios';
import { TeacherType } from '@/types/user-type';
import { CustomError } from '@/utils/error';

export const postTeachers = async (data: TeacherType) => {
    try {
        const response = await api.post('/teachers', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error?.response?.data.errors.message);
            if (error.response) {
                throw new CustomError(
                    error?.response?.data.errors.message || 'an error occured',
                    error.response.status || 500,
                );
            }
            throw error;
        }
    }
};
