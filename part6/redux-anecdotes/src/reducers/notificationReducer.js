

export const newNotification = (message, timeout) => {
    return async dispatch => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: message,
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
        })
      }, timeout * 1000)
    }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default reducer
