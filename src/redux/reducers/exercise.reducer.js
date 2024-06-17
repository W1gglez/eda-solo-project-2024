import { combineReducers } from 'redux';

const exercises = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXERCISES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  exercises,
});
