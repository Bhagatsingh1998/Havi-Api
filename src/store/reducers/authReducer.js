import * as actionTypes from './../actionTypes'; 

const initialState = {
  signInUser: false
}

const authReducer = (state = initialState, action) => {
  let type = action.type;
  let newState;
  switch(type) {
    case actionTypes.AUTH_USER_LOGIN: 
      newState = { ...state }
      newState.signInUser = true;
      return newState;
    
      default:
        return state;
  }
}

export default authReducer;