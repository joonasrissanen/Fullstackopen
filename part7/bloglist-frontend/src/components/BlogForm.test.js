import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<BlogForm /> submit is called with correct input values', async () => {
  const submit = jest.fn();
  const component = render(
    <BlogForm submitBlog={submit} />
  );

  const title = component.container.querySelector('#title');
  fireEvent.change(title, {
    target: { value: 'test title' }
  });
  const author = component.container.querySelector('#author');
  fireEvent.change(author, {
    target: { value: 'test author' }
  });
  const url = component.container.querySelector('#url');
  fireEvent.change(url, {
    target: { value: 'www.foo.bar' }
  });
  const form = component.container.querySelector('form');
  fireEvent.submit(form);
  expect(submit.mock.calls).toHaveLength(1);
  expect(submit.mock.calls[0][1].title).toBe('test title' );
  expect(submit.mock.calls[0][1].author).toBe('test author' );
  expect(submit.mock.calls[0][1].url).toBe('www.foo.bar' );
});
