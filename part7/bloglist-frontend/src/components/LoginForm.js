import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { newNotification } from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';
import userService from '../services/users';


const LoginForm = ({ newNotification, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameOnChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  const passwordOnChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const loginRequest = (event) => {
    event.preventDefault();
    return userService.login(username, password)
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        newNotification({ message: 'Wrong username or password', isError: true }, 5);
      });
  };
  return (
    <Form onSubmit={loginRequest}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control id="username" type="text" onChange={usernameOnChange}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control id="password" type="password" onChange={passwordOnChange}/>
      </Form.Group>
      <Button variant="primary" id="login-button" type="submit" >login</Button>
    </Form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  newNotification: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  newNotification,
  setUser
};

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm);

export default ConnectedLoginForm;
