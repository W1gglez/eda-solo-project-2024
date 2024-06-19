const workoutLog = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WORKOUT':
      return action.payload.workout_info;
    default:
      return state;
  }
};

export default workoutLog;
