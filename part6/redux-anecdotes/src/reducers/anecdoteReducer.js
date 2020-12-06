import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (oldAnecdote) => {
  return async dispatch => {
    const newAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
    const voted = await anecdoteService.updateAnecdote(newAnecdote);
    dispatch({
      type: 'VOTE',
      data: voted
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnectdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find(a => a.id === id)
      const changed = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(a => a.id === id ? changed : a)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer