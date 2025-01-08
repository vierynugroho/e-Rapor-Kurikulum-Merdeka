import api from '@/lib/axios';

export async function getStudents() {
    const data = await api.get('/students');
    return data.data;
}
