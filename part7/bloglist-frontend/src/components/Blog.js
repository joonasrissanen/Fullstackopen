import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const Blog = ({ blogs, likeBlog/*, deleteBlog*/ }) => {
  if (!blogs) {
    return null;
  }
  const id = useParams().id;
  const blog = blogs.find(b => b.id === id);
  if (!blog) {
    return null;
  }

  const like = (event) => {
    event.preventDefault();
    likeBlog(blog);
  };

  // const removeBlog = (event) => {
  //   event.preventDefault();
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     deleteBlog(blog);
  //   }
  // };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={like} >like</button>
      </div>
      <div>
        added by {blog.user && blog.user.name}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.array,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};


export default Blog;
