import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
    const vote = (id) => {
      const anecdote = props.anecdotes.find(a => a.id === id)
      props.voteAnecdote(anecdote)
      const message = `you voted ${anecdote.content}`
      props.newNotification(message, 5)
    }
    return (
        <>
          {props.anecdotes.map(anecdote =>
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

const mapStateToProps = ({ anecdotes, filter }) => {
  const sorted = anecdotes.sort((a, b) => b.votes - a.votes)
  if (filter === 'ALL') {
      return { anecdotes: sorted }
  }
  const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  return {
    anecdotes: filtered
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  newNotification,
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedComponent
