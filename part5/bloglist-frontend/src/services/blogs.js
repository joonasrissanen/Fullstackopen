import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const postBlog = (blog, token) => {
    return axios.post(baseUrl, blog, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

const blogService = { getAll, postBlog };

export default blogService;
