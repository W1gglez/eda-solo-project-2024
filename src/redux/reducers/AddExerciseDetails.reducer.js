const exerciseDetailsReducer = (state = { set_info: [] }, action) => {
  switch (action.type) {
    case 'SET_WORKOUT_ID':
      return { ...state, workout_id: action.payload };
    case 'SET_EXERCISE_ID':
        const {exercise_id, exercise_name} = action.payload;
      return { ...state, exercise_id, exercise_name };
    case 'SET_SET_INFO':
      return { ...state, set_info: action.payload };
    case 'CLEAR_DETAILS':
      return { set_info: [] };
    default:
      return state;
  }
};

export default exerciseDetailsReducer;
