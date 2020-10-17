const blogsRouter = require('express').Router();
require('express-async-errors');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  console.log('Body user id', body.userId, 'Mongo user id', user._id);
  const blog = new Blog({
    ...body,
    user: user._id
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.sendStatus(204);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, body, { new: true });
  response.json(result.toJSON());
});
module.exports = blogsRouter;