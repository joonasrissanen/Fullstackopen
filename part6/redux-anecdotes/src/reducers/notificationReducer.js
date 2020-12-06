

export const newNotification = (content) => {
    return {
        type: 'NEW_NOTIFICATION',
        data: content,
    }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default reducer
