import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ submitBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    submitBlog(event, newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={e => handleSubmit(e)} >
        <div>title:<input onChange={e => setTitle(e.target.value)} /></div>
        <div>author:<input onChange={e => setAuthor(e.target.value)} /></div>
        <div>url:<input onChange={e => setUrl(e.target.value)} /></div>
        <input type="submit" value="Create" />
      </form>
    </div>

  )
}

BlogForm.propTypes = {
  submitBlog: PropTypes.func.isRequired,
}

export default BlogForm
