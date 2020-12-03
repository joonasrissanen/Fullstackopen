import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { login } from '../services/users'

const LoginForm = ({ setUser, sendNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameOnChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }
  const passwordOnChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }
  const loginRequest = (event) => {
    event.preventDefault()
    return login(username, password)
      .then(res => {
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(res.data))
        setUser(res.data)
        sendNotification(null, true)
      })
      .catch(() => {
        sendNotification('Wrong username or password', true)
      })
  }
  return (
    <form onSubmit={loginRequest}>
      <div>username
        <input type="text" onChange={usernameOnChange}/>
      </div>
      <div>password
        <input type="password" onChange={passwordOnChange}/>
      </div>
      <button type="submit" >login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  sendNotification: PropTypes.func.isRequired,
}

export default LoginForm