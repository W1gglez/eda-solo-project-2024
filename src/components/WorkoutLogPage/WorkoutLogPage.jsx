import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import WorkoutLogDisplay from '../WorkoutLogDisplay/WorkoutLogDisplay';

export default function WorkoutLogPage() {
  const workoutLog = useSelector((store) => store.workoutLog);
  const dispatch = useDispatch();

  //Needs to be fixed//
  useEffect(() => {
    console.log('useEffect ran');
    dispatch({ type: 'FETCH_WORKOUT' });
    console.log(workoutLog);
  }, []);

  return (
    <>
      <h1>Workout Log</h1>
      <h3>{workoutLog.date}</h3>
      {!workoutLog ? (
        <button onClick={() => dispatch({ type: 'ADD_WORKOUT' })}>
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

    //   <table>
    //        <thead>
    //            <tr>
    //              <th>Set</th>
    //              <th>Reps</th>
    //              <th>Weight</th>
    //            </tr>
    //          </thead>
    //          <tbody>
    //            {workoutLog.set_info.map((s) => (
    //              <tr key={s.set_id}>
    //                <td>{s.set_number}</td>
    //                <td>{s.reps}</td>
    //                <td>{s.weight}</td>
    //              </tr>
    //            ))}
    //          </tbody>
    //        </table>
  );
}
