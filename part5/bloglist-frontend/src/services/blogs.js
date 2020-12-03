import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = (blog, token) => {
  return axios.post(baseUrl, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
}

const updateBlog = (blog, token) => {
  return axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
}

const removeBlog = (blog, token) => {
  return axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
}

const blogService = { getAll, postBlog, updateBlog, removeBlog }

export default blogService
