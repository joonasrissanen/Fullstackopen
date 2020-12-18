import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { commentBlog } from '../reducers/blogReducer';


const Blog = ({ blog, likeBlog, commentBlog }) => {
  if (!blog) {
    return null;
  }
  const [comment, setComment] = useState('');

  const like = (event) => {
    event.preventDefault();
    likeBlog(blog);
  };

  const sendComment = (event) => {
    event.preventDefault();
    if (comment !== '') {
      commentBlog(blog, comment);
      setComment('');
    }
  };

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
      <h2>comments</h2>
      <div>
        <form onSubmit={sendComment}>
          <input value={comment} onChange={e => setComment(e.target.value)}/>
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, i) => <li key={`${blog.id}-comment-${i}`}>{comment}</li>)}
        </ul>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

const ConnectedBlog = connect(null, { commentBlog })(Blog);

export default ConnectedBlog;

