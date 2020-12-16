export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    const user = loggedUserJSON ? JSON.parse(loggedUserJSON) : null;
    dispatch({
      type: 'INIT_USER',
      data: user
    });
  };
};

export const setUser = (user) => {
  return dispatch => {
    const json = JSON.stringify(user);
    window.localStorage.setItem('loggedBlogUser', json);
    dispatch({
      type: 'LOGIN_USER',
      data: json
    });
  };
};

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogUser');
    dispatch({
      type: 'LOGOUT_USER',
      user: null
    });
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.data;
  case 'LOGIN_USER':
    return action.data;
  case 'LOGOUT_USER':
    return null;
  default:
    return state;
  }
};

export default userReducer;
