import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const Notification = ({ message, isError }) => {
  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={{ ...style, color: isError ? 'red' : 'green' }}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool,
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const sendNotification = (message, isError) => {
    setMessage(message)
    setError(isError)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const submitBlog = (blog) => {
    if (user && user.token) {
      blogService.postBlog(blog, user.token).then(() => {
        sendNotification(`A new blog ${blog.title} by ${blog.author}`, false)
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
      }).catch(error => {
        console.log(error)
        sendNotification('Creating blog failed', true)
      })
    }
  }

  const updateBlog = (blog) => {
    if (user && user.token) {
      blogService.updateBlog(blog, user.token).then(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
      })
    }
  }

  const deleteBlog = (blog) => {
    if (user && user.token) {
      blogService.removeBlog(blog, user.token).then(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
      })
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  if (!user) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification message={message} isError={isError} />
        <Togglable buttonLabel='log in'>
          <LoginForm sendNotification={sendNotification} setUser={setUser}/>
        </Togglable>
      </div>
    )

  }
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} isError={isError} />
      <div>
        {user.name}
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog'>
        <BlogForm submitBlog={submitBlog} />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App