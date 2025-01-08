import api from '@/lib/axios';

export async function getTeachers() {
    const data = await api.get('/teachers');
    return data.data;
}
