import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, ListGroup } from 'react-bootstrap';
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
        likes {blog.likes}{' '}
        <Button variant="primary" onClick={like} >like</Button>
      </div>
      <div>
        added by {blog.user && blog.user.name}
      </div>
      <h2>Comments</h2>
      <div>
        <Form onSubmit={sendComment}>
          <Form.Group>
            <Form.Control value={comment} onChange={e => setComment(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">add comment</Button>
        </Form>
        <ListGroup variant="flush">
          {blog.comments.map((comment, i) => <ListGroup.Item key={`${blog.id}-comment-${i}`}>{comment}</ListGroup.Item>)}
        </ListGroup>
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

