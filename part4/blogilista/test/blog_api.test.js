const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const initialBlogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
];

const newBlog = { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 };
const noLikes = { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', __v: 0 };
const noUrl = { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', likes: 10, __v: 0 };
const noTitle = { _id: '5a422bc61b54a676234d17fc', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 };

const testUser = {
  'username': 'root',
  'password': 'sekret'
};

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
  const login = await api.post('/api/login').send(testUser);
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({Authorization: `Bearer ${login.body.token}`})
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

test('new blog can be posted', async () => {
  const login = await api.post('/api/login').send(testUser);
  await api.post('/api/blogs').send(newBlog).set({Authorization: `Bearer ${login.body.token}`});
  const response = await api.get('/api/blogs').set({Authorization: `Bearer ${login.body.token}`});
  expect(response.body).toHaveLength(3);
});

test('if new blogs does not have likes, likes should be 0', async () => {
  const login = await api.post('/api/login').send(testUser);
  await api.post('/api/blogs').send(noLikes).set({Authorization: `Bearer ${login.body.token}`});
  const response = await api.get('/api/blogs').set({Authorization: `Bearer ${login.body.token}`});
  expect(response.body[2].likes).toBe(0);
});

test('if new blog does not have title, 400 is returned', async () => {
  const login = await api.post('/api/login').send(testUser);
  await api.post('/api/blogs')
    .send(noTitle)
    .set({Authorization: `Bearer ${login.body.token}`})
    .expect(400);
});

test('if new blog does not have url, 400 is returned', async () => {
  const login = await api.post('/api/login').send(testUser);
  await api.post('/api/blogs')
    .send(noUrl)
    .set({Authorization: `Bearer ${login.body.token}`})
    .expect(400);
});

test('blog can be deleted by id', async () => {
  const login = await api.post('/api/login').send(testUser);
  await api.post('/api/blogs').send(newBlog).set({Authorization: `Bearer ${login.body.token}`});
  await api.delete(`/api/blogs/${newBlog._id}`)
    .set({Authorization: `Bearer ${login.body.token}`})
    .expect(204);
  const response = await api.get('/api/blogs')
    .set({Authorization: `Bearer ${login.body.token}`});
  expect(response.body).toHaveLength(2);
});

test('blog can be updated by id', async () => {
  const login = await api.post('/api/login').send(testUser);
  const id = initialBlogs[0]._id;
  const updatedBlog = {
    ...initialBlogs[0],
    id: initialBlogs[0]._id,
    likes: 10,
  };
  delete updatedBlog._id;
  delete updatedBlog.__v;
  await api.put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .set({Authorization: `Bearer ${login.body.token}`})
    .expect(200);
  const response = await api.get('/api/blogs')
    .set({Authorization: `Bearer ${login.body.token}`});
  expect(response.body.find(blog => blog.id === id)).toEqual(updatedBlog);
});

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  await user.save();
});

afterAll(() => {
  mongoose.connection.close();
});