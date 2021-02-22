const initialState = {
  username : null,
  loggedIn : false,
  userId : null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_USERNAME":
    return Object.assign({}, state, {
      username : action.text,
    });
  case "SET_LOG":
    return Object.assign({}, state, {
      loggedIn : action.logStatus,
    });
  case "SET_UID":
    return Object.assign({}, state, {
      userId : action.id,
    });
  default:
    return state;
  }
};

export default rootReducer;
