const workoutLog = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WORKOUT':
      return action.payload;
    default:
      return state;
  }
};

export default workoutLog;
