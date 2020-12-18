import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const BlogForm = ({ submitBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    submitBlog(newBlog);
  };
  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={e => handleSubmit(e)} >
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control id='title' onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control id='author' onChange={e => setAuthor(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url</Form.Label>
          <Form.Control id='url' onChange={e => setUrl(e.target.value)} />
        </Form.Group>
        <Button variant="primary" id='blog-submit' type="submit">
          Create
        </Button>
      </Form>
    </div>

  );
};

BlogForm.propTypes = {
  submitBlog: PropTypes.func.isRequired,
};

export default BlogForm;
