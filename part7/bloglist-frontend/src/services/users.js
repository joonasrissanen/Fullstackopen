import axios from 'axios';
const loginUrl = '/api/login';
const usersUrl = '/api/users';
const login = (username, password) => {
  return axios.post(loginUrl, { username, password });
};

const getAll = async () => {
  return axios.get(usersUrl);
};
const userService = {
  getAll,
  login
};

export default userService;
