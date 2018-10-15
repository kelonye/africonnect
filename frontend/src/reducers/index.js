import { combineReducers } from 'redux';

const user = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER': {
      console.log(action.payload);
      return action.payload;
    }

    default:
      return state;
  }
};

export default combineReducers({
  user
});
