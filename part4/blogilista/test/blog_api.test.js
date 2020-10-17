const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
];

const newBlog = { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 };
const noLikes = { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', __v: 0 };
const noUrl = { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', likes: 10, __v: 0 };
const noTitle = { _id: '5a422bc61b54a676234d17fc', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 };

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

test('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].title).toBe('React patterns');
});

test('identifier for blogs should be "id" not default "id" from mongo', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('blog is posted succesfully', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

test('new blog can be posted', async () => {
  await api.post('/api/blogs').send(newBlog);
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(3);
});

test('if new blogs does not have likes, likes should be 0', async () => {
  await api.post('/api/blogs').send(noLikes);
  const response = await api.get('/api/blogs');
  expect(response.body[2].likes).toBe(0);
});

test('if new blog does not have title, 400 is returned', async () => {
  await api.post('/api/blogs')
    .send(noTitle)
    .expect(400);
});

test('if new blog does not have url, 400 is returned', async () => {
  await api.post('/api/blogs')
    .send(noUrl)
    .expect(400);
});

test('blog can be deleted by id', async () => {
  const id = initialBlogs[0]._id;
  await api.delete(`/api/blogs/${id}`).expect(204);
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(1);
});

test('blog can be updated by id', async () => {
  const id = initialBlogs[0]._id;
  const updatedBlog = {
    ...initialBlogs[0],
    id: initialBlogs[0]._id,
    likes: 10,
  };
  delete updatedBlog._id;
  delete updatedBlog.__v;
  await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(200);
  const response = await api.get('/api/blogs');
  expect(response.body.find(blog => blog.id === id)).toEqual(updatedBlog);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

afterAll(() => {
  mongoose.connection.close();
});