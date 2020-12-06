
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const [anecdote, setAnecdote] = useState('')
    const createAnecdote = async (event) => {
      event.preventDefault()
      if (anecdote || anecdote !== '') {
        dispatch(newAnecdote(anecdote))
        const message = `you created ${anecdote}`
        dispatch(newNotification(message), 5)
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

export default AnecdoteForm