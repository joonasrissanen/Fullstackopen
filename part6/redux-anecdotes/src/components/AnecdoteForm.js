
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    const [anecdote, setAnecdote] = useState('')
    const createAnecdote = async (event) => {
      event.preventDefault()
      if (anecdote || anecdote !== '') {
        props.newAnecdote(anecdote)
        const message = `you created ${anecdote}`
        props.newNotification(message, 5)
        setAnecdote('')
      }
    }
    return (
        <>
          <h2>create new</h2>
          <form onSubmit={createAnecdote}>
            <div><input value={anecdote} onChange={(e) => setAnecdote(e.target.value)}/></div>
            <button type="submit">create</button>
          </form>
        </>
    )
}

const mapDispatchToProps = {
  newAnecdote,
  newNotification
}

const ConnectedComponent = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedComponent