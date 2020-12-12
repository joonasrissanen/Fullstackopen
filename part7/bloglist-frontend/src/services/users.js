import axios from 'axios'
const loginUrl = '/api/login'

const login = (username, password) => {
  return axios.post(loginUrl, { username, password })
}

const userService = {
  login
}

export default userService
