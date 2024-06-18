import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function WorkoutLogPage() {
  const workout_log = useSelector((store) => store.workout_log);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_WORKOUT' });
  });

  return (
    <>
      <h1>Workout Log</h1>
      {workout_log ?? (
        <table>
          <tbody>
            {workout_log.map((e) => (
              <tr>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
