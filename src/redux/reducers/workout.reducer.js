const workout_log = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WORKOUT':
      return action.payload;
    default:
      return state;
  }
};

export default workout_log;
