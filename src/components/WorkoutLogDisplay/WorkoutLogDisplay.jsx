import { useSelector, useDispatch } from 'react-redux';
import SetInfoDisplay from '../SetInfoDisplay/SetInfoDisplay';

export default function WorkoutLogDisplay() {
  const workoutLog = useSelector((store) => store.workoutLog);
  const dispatch = useDispatch();

  return (
    <>
      {workoutLog.exercises.map((e) => (
        <>
          <p>{e.exercise_name}</p>
          <button
            onClick={() =>
              dispatch({
                type: 'REMOVE_EXERCISE',
                payload: { id: e.detail_id },
              })
            }
          >
            X
          </button>
          <ul>
            <SetInfoDisplay e={e} />
          </ul>
        </>
      ))}
    </>
  );
}
