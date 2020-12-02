import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';

const Notification = ({ message, isError }) => {
    const style = {
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };

    if (message === null) {
      return null
    }

    return (
      <div style={{...style, color: isError ? 'red' : 'green'}}>
        {message}
      </div>
    )
};

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [isError, setError] = useState(false);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    const sendNotification = (message, isError) => {
        setMessage(message);
        setError(isError);
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    const submitBlog = (event, blog) => {
        event.preventDefault();
        if (user && user.token) {
            blogService.postBlog(blog, user.token).then(() => {
                sendNotification(`A new blog ${blog.title} by ${blog.author}`, false)
                blogService.getAll().then(blogs =>
                    setBlogs( blogs )
                );
            }).catch(error => {
                console.log(error);
                sendNotification('Creating blog failed', true)
            });
        }
    };

    const logout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('loggedBlogUser');
        setUser(null);
    };
    if (!user) {
        return (
        <div>
            <h1>log in to application</h1>
            <Notification message={message} isError={isError} />
            <LoginForm sendNotification={sendNotification} setUser={setUser}/>
        </div>
        );

    }
    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message} isError={isError} />
            <div>
                {user.name}
                <button onClick={logout}>logout</button>
            </div>
            <BlogForm submitBlog={submitBlog} />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default App;