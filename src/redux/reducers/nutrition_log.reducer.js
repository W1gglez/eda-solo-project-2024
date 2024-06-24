const nutritionLog = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TRACKER':
      return action.payload;
    default:
      return state;
  }
};

export default nutritionLog;
