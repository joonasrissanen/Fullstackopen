import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === 'ALL') {
            return anecdotes
        }
        const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        return filtered.sort((a, b) => b.votes - a.votes)
    })
    const vote = (id) => {
      const anecdote = anecdotes.find(a => a.id === id)
      dispatch(voteAnecdote(anecdote))
      const message = `you voted ${anecdote.content}`
      dispatch(newNotification(message, 5))
    }
    return (
        <>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </>
    )
}

export default AnecdoteList