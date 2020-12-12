import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../services/users'
import { newNotification } from '../reducers/notificationReducer'

const LoginForm = ({ setUser, newNotification }) => {
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
      })
      .catch(() => {
        newNotification({ message: 'Wrong username or password', isError: true }, 5)
      })
  }
  return (
    <form onSubmit={loginRequest}>
      <div>username
        <input id="username" type="text" onChange={usernameOnChange}/>
      </div>
      <div>password
        <input id="password" type="password" onChange={passwordOnChange}/>
      </div>
      <button id="login-button" type="submit" >login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  newNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  newNotification
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
