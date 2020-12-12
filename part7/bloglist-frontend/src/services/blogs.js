import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postBlog = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.data
}

const updateBlog = async (blog, token) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.data
}

const removeBlog = async (blog, token) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return response.data
}

const blogService = { getAll, postBlog, updateBlog, removeBlog }

export default blogService
