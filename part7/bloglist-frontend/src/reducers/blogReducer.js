import blogService from '../services/blogs';

export const createBlog = (blog, token) => {
  return async dispatch => {
    const newBlog = await blogService.postBlog(blog, token);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const likeBlog = (blog, token) => {
  const newBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id
  };
  return async dispatch => {
    const likedBlog = await blogService.updateBlog(newBlog, token);
    dispatch({
      type: 'UPDATE_BLOG',
      data: likedBlog
    });
  };
};

export const deleteBlog = (blog, token) => {
  return async dispatch => {
    const deletedBlog = await blogService.removeBlog(blog, token);
    dispatch({
      type: 'DELETE_BLOG',
      data: deletedBlog,
    });
  };
};

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const commented = await blogService.commentBlog(blog, comment);
    dispatch({
      type: 'COMMENT_BLOG',
      data: commented,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data];
  case 'INIT_BLOGS':
    return action.data;
  case 'UPDATE_BLOG': {
    const id = action.data.id;
    return state.map(b => b.id === id ? action.data : b);
  }
  case 'DELETE_BLOG': {
    const id = action.data.id;
    return state.filter(b => b.id === id);
  }
  case 'COMMENT_BLOG': {
    const id = action.data.id;
    return state.map(b => b.id === id ? action.data : b);
  }
  default:
    return state;
  }
};

export default blogReducer;