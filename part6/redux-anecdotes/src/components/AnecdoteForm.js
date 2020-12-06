
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const [anecdote, setAnecdote] = useState('')
    const createAnecdote = (event) => {
      event.preventDefault()
      if (anecdote || anecdote !== '') {
        dispatch(newAnecdote(anecdote))
        setAnecdote('')
      }
    }
    return (
        <>
          <h2>create new</h2>
          <form>
          <div><input value={anecdote} onChange={(e) => setAnecdote(e.target.value)}/></div>
          <button onClick={createAnecdote}>create</button>
          </form>
        </>
    )
}

export default AnecdoteForm