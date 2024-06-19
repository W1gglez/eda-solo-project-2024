import moment from 'moment';

const dateReducer = (state = moment().format('YYYY-MM-DD'), action) => {
  switch (action.type) {
    case 'SET_DATE':
      return action.payload;
    default:
      return state;
  }
};

export default dateReducer;
