import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { newNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'

const App = (props) => {
  const { user } = props
  useEffect(() => {
    props.initializeBlogs()
    props.initializeUser()
  }, [])

  const submitBlog = (blog) => {
    if (user && user.token) {
      props.createBlog(blog, user.token)
      props.newNotification({ message: `A new blog ${blog.title} by ${blog.author}`, isError: false }, 5)
    } else {
      props.newNotification({ message: 'Creating blog failed', isError: true }, 5)
    }
  }

  const like = (blog) => {
    if (user && user.token) {
      props.likeBlog(blog, user.token)
    }
  }

  const deleteBlog = (blog) => {
    if (user && user.token) {
      props.deleteBlog(blog, user.token)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    props.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification />
        <Togglable buttonLabel='log in'>
          <LoginForm />
        </Togglable>
      </div>
    )

  }
  const sortedBlogs = props.blogs.sort((a, b) => b.likes - a.likes)

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
          <Blog key={blog.id} blog={blog} likeBlog={like} deleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ blogs, user }) => {
  return {
    blogs,
    user
  }
}

const mapDispatchToProps = {
  newNotification,
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
  initializeUser,
  logoutUser
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
