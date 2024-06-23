const exerciseDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EXERCISE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default exerciseDetails;
