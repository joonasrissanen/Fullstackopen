import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

test('<Blog /> renders title and author', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 2,
    url: 'www.foo.bar',
    id: 1,
  };
  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} />
  );

  expect(component.container).toHaveTextContent(
    blog.title
  );
  expect(component.container).toHaveTextContent(
    blog.author,
  );
});

test('<Blog /> renders url and likes after clicking view-button', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 2,
    url: 'www.foo.bar',
    id: 1,
  };
  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} />
  );
  const button = component.getByText('view');
  fireEvent.click(button);
  expect(component.container).toHaveTextContent(
    blog.url
  );
  expect(component.container).toHaveTextContent(
    `likes ${blog.likes}`,
  );
});

test('<Blog /> update blog is called when pressing like-button', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 2,
    url: 'www.foo.bar',
    id: 1,
  };
  const updateBlog = jest.fn();
  const deleteBlog = jest.fn();

  const component = render(
    <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
  );
  const buttonView = component.getByText('view');
  fireEvent.click(buttonView);
  const buttonLike = component.getByText('like');
  fireEvent.click(buttonLike);
  fireEvent.click(buttonLike);
  expect(updateBlog.mock.calls).toHaveLength(2);
});
