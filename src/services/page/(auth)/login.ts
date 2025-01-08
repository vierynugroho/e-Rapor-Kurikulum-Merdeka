import axios from 'axios';

export class Auth {
    static async login() {
        const response = await axios.post('/api/auth/login');
        return response.data;
    }
}
