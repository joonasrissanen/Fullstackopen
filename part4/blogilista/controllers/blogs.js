const blogsRouter = require('express').Router();
require('express-async-errors');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.sendStatus(204);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, body, { new: true });
  response.json(result.toJSON());
})
module.exports = blogsRouter;