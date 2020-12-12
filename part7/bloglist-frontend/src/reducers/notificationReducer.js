let timeoutId = null

export const newNotification = (object, timeoutInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: object,
    })
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, timeoutInSeconds * 1000)
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return {
      message: action.data.message,
      isError: action.data.isError,
    }
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default reducer