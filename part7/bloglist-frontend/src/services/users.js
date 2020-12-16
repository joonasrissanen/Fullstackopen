import axios from 'axios';
const loginUrl = '/api/login';
const usersUrl = '/api/users';
const login = (username, password) => {
  return axios.post(loginUrl, { username, password });
};

const getAll = async () => {
  const response = await axios.get(usersUrl);
  return response.data;
};
const userService = {
  getAll,
  login
};

export default userService;
