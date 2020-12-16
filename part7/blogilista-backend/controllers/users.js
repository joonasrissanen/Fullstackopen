const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
require('express-async-errors');
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  console.log(users)
  response.json(users.map(user => user.toJSON()));
});

module.exports = usersRouter;