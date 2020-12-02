import axios from 'axios';
const baseUrl = '/api/users';
const loginUrl = '/api/login';

export const login = (username, password) => {
    return axios.post(loginUrl, { username, password });
};
