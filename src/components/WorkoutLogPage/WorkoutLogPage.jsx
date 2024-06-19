import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import WorkoutLogDisplay from '../WorkoutLogDisplay/WorkoutLogDisplay';
import moment from 'moment';

export default function WorkoutLogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const workoutLog = useSelector((store) => store.workoutLog);
  const dispatch = useDispatch();

  //Needs to be fixed//
  useEffect(() => {
    setIsLoading(true);
    dispatch({
      type: 'FETCH_WORKOUT',
      payload: { date: date },
    });
    setIsLoading(false);
  }, [dispatch, date]);

  return (
    <>
      <h1>Workout Log</h1>
      <input
        type='date'
        value={date}
        onChange={(e) => setDate(moment(e.target.value).format('YYYY-MM-DD'))}
      />

      {isLoading ? (
        <></>
      ) : Object.keys(workoutLog).length === 0 ? (
        <button
          onClick={() =>
            dispatch({ type: 'ADD_WORKOUT', payload: { date: date } })
          }
        >
          Add Workout
        </button>
      ) : (
        <>
          <WorkoutLogDisplay />
          <button onClick={() => history.push('/AddExerciseForm')}>
            Add Exercise
          </button>
        </>
      )}
    </>
  );
}
