import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { newNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import userService from '../services/users'


const LoginForm = ({ newNotification, setUser }) => {
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
    return userService.login(username, password)
      .then(res => {
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
  newNotification,
  setUser
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm
