
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm';

const Notification = ({ message }) => {
  if ( !message ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {message}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const jwt = localStorage.getItem('library-user-token')
    if (jwt) {
      setToken(jwt)
    }
  }, [])

  useEffect(() => {
    if (token) {
      setPage('authors')
    }
  }, [token])
  const sendNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Notification message={errorMessage} />
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={sendNotification}
      />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setErrorMessage={sendNotification}
      />
    </div>
  )
}

export default App