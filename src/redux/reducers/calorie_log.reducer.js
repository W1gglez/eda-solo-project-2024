const calorieLog = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CALORIE':
      return action.payload;
    default:
      return state;
  }
};

export default calorieLog;
