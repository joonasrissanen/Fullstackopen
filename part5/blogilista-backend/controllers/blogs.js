const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
require('express-async-errors');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const body = request.body;
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  console.log('token', decodedToken)
  const user = await User.findById(decodedToken.id);
  console.log('user', user);
  const blog = await Blog.findById(request.params.id);
  console.log('blog', blog);
  if (blog.user.toString() === user.id.toString()) {
    await blog.remove();
    return response.sendStatus(204);
  }
  return response.sendStatus(401);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, body, { new: true });
  response.json(result.toJSON());
});
module.exports = blogsRouter;