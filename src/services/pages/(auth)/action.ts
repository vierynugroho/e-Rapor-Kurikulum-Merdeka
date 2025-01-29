import axios from 'axios';

export const Auth = {
    async login() {
        const response = await axios.post('/auth/login');
        return response.data;
    },

    async logout() {
        console.log('logout');
    },
};
