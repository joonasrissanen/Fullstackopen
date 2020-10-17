const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRoutes = require('./controllers/users');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');

const app = express();
const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;