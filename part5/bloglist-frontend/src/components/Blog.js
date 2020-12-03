import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [isHidden, setHidden] = useState(true)
  const showWhenVisible = { display: isHidden ? 'none' : '' }

  const likeBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(newBlog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setHidden(!isHidden)} >{isHidden ? 'view' : 'hide'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
                likes {blog.likes}
        <button onClick={likeBlog} >like</button>
        <div>{blog.user && blog.user.name}</div>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object,
  }),
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
