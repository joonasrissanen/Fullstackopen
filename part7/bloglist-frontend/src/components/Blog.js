import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const [isHidden, setHidden] = useState(true);
  const showWhenVisible = { display: isHidden ? 'none' : '' };

  const like = (event) => {
    event.preventDefault();
    likeBlog(blog);
  };

  const removeBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setHidden(!isHidden)} >{isHidden ? 'view' : 'hide'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
                likes {blog.likes}
        <button onClick={like} >like</button>
        <div>{blog.user && blog.user.name}</div>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};


export default Blog;
