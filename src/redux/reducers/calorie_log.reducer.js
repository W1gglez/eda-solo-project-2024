import { combineReducers } from 'redux';

const calorieLog = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CALORIE_LOG':
      return action.payload;
    default:
      return state;
  }
};

export default calorieLog;

