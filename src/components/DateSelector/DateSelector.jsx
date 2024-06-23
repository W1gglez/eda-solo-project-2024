import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

export default function DateSelector() {
  const dispatch = useDispatch();
  const date = useSelector((store) => store.date);

  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: 'SET_DATE',
            payload: moment(date).subtract(1, 'd').format('YYYY-MM-DD'),
          })
        }
      >
        {'<'}
      </button>
      <input
        type='date'
        value={date}
        onChange={(e) => {
          dispatch({
            type: 'SET_DATE',
            payload: e.target.value,
          });
        }}
      />
      <button
        onClick={() =>
          dispatch({
            type: 'SET_DATE',
            payload: moment(date).add(1, 'd').format('YYYY-MM-DD'),
          })
        }
      >
        {'>'}
      </button>
      <br />
    </>
  );
}
