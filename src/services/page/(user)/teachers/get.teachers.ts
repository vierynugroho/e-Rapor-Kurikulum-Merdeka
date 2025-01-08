import api from '@/lib/axios';

export const getTeachers = async () => {
    const response = await api.get('/teachers');
    return response.data.data;
};
