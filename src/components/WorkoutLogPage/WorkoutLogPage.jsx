import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import WorkoutLogDisplay from './WorkoutLogDisplay/WorkoutLogDisplay';

export default function WorkoutLogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const workoutLog = useSelector((store) => store.workoutLog);
  const date = useSelector((store) => store.date);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    dispatch({
      type: 'FETCH_WORKOUT',
      payload: { date: date },
    });
    setIsLoading(false);
  }, [date]);

  return (
    <>
      <h1>Workout Log</h1>
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
          <button
            onClick={() => {
              history.push(`/add-exercise/${workoutLog.workout_id}`);
            }}
          >
            Add Exercise
          </button>
        </>
      )}
    </>
  );
}
