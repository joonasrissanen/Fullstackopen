import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { newNotification } from './reducers/notificationReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const submitBlog = (blog) => {
    if (user && user.token) {
      blogService.postBlog(blog, user.token).then(() => {
        props.newNotification({ message: `A new blog ${blog.title} by ${blog.author}`, isError: false }, 5)
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
      }).catch(error => {
        console.log(error)
        props.newNotification({ message: 'Creating blog failed', isError: true }, 5)
      })
    }
  }

  const updateBlog = (blog) => {
    if (user && user.token) {
      blogService.updateBlog(blog, user.token).then(res => {
        console.log(res)
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
        <Notification />
        <Togglable buttonLabel='log in'>
          <LoginForm setUser={setUser}/>
        </Togglable>
      </div>
    )

  }
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name}
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog'>
        <BlogForm submitBlog={submitBlog} />
      </Togglable>
      <div id="blog-list">
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  newNotification,
}
const ConnectedApp = connect(null, mapDispatchToProps)(App)

export default ConnectedApp
