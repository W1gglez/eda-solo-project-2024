import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CalorieTrackerDisplay from './CalorieTrackerDisplay/CalorieTrackerDisplay';
import moment from 'moment';

export default function CalorieTrackerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const calorieTracker = useSelector((store) => store.calorieTracker);
  const date = useSelector((store) => store.date);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    dispatch({
      type: 'FETCH_TRACKER',
      payload: { date: date },
    });
    setIsLoading(false);
  }, [date]);

  return (
    <>
      <h1>Nutrition Diary</h1>
      <input
        type='date'
        value={date}
        onChange={(e) =>
          dispatch({
            type: 'SET_DATE',
            payload: e.target.value,
          })
        }
      />

      {isLoading ? (
        <></>
      ) : (
        /*Object.keys(calorieTracker).length === 0 ? (*/
        //   <button
        //     onClick={() => dispatch({ type: 'ADD_LOG', payload: { date: date } })}
        //   >
        //     Add Log
        //   </button>
        /* ) : */ <>
          {calorieTracker.log_id && <CalorieTrackerDisplay />}
          <button
            onClick={() => {
              calorieTracker.log_id
                ? history.push(`/add-entry/${calorieTracker.log_id}`)
                : (dispatch({ type: 'ADD_LOG', payload: { date: date } }),
                  history.push(`/add-entry/${calorieTracker.log_id}`));
            }}
          >
            Add Entry
          </button>
        </>
      )}
    </>
  );
}
