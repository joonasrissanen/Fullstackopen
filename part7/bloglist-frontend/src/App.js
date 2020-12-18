import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import userService from './services/users';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import { newNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer';
import { initializeUser, logoutUser } from './reducers/userReducer';
import UsersView from './components/UsersView';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

const BlogListItem = ({ blog }) => {
  const style = {
    marginTop: 10,
    border: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  };
  return (
    <div style={style}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </div>
  );
};

const Navigation = ({ loggedUserName, logout }) => {
  return (
    <div>
      <Link to="/">blogs</Link>{' '}
      <Link to="/users">users</Link>{' '}
      {loggedUserName} logged in{' '}
      <button onClick={logout}>logout</button>
    </div>
  );
};
const App = (props) => {
  const { user } = props;

  const [usersList, setUsers] = useState([]);
  const blogsMatch = useRouteMatch('/blogs/:id');
  const usersMatch = useRouteMatch('/users/:id');

  useEffect(() => {
    props.initializeBlogs();
    props.initializeUser();
    userService.getAll().then(response => setUsers(response.data));
  }, []);

  const submitBlog = (blog) => {
    if (user && user.token) {
      props.createBlog(blog, user.token);
      props.newNotification({ message: `A new blog ${blog.title} by ${blog.author}`, isError: false }, 5);
    } else {
      props.newNotification({ message: 'Creating blog failed', isError: true }, 5);
    }
  };

  const like = (blog) => {
    if (user && user.token) {
      props.likeBlog(blog, user.token);
    }
  };

  const deleteBlog = (blog) => {
    if (user && user.token) {
      props.deleteBlog(blog, user.token);
    }
  };

  const logout = (event) => {
    event.preventDefault();
    props.logoutUser();
  };

  if (!user) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification />
        <Togglable buttonLabel='log in'>
          <LoginForm />
        </Togglable>
      </div>
    );

  }
  const sorted = props.blogs.sort((a,b) => b.likes - a.likes);

  const selectedBlog = blogsMatch ? sorted.find(b => b.id === blogsMatch.params.id) : null;
  const selectedUser = usersMatch ? usersList.find(u => u.id === usersMatch.params.id) : null;
  return (
    <div>
      <Navigation loggedUserName={user.name} logout={logout} />
      <h2>blogs</h2>
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={selectedBlog} likeBlog={like} deleteBlog={deleteBlog} />
        </Route>
        <Route path="/users/:id">
          <User user={selectedUser} />
        </Route>
        <Route path="/users">
          <UsersView users={usersList} />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='new blog'>
            <BlogForm submitBlog={submitBlog} />
          </Togglable>
          <div id="blog-list">
            {sorted.map(blog => <BlogListItem key={blog.id} blog={blog} />)}
          </div>
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ blogs, user }) => {
  return {
    blogs,
    user
  };
};

const mapDispatchToProps = {
  newNotification,
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
  initializeUser,
  logoutUser
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
