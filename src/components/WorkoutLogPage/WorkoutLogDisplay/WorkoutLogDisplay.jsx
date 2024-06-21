import { useSelector, useDispatch } from 'react-redux';
import SetInfoDisplay from '../SetInfoDisplay/SetInfoDisplay';
import { useState } from 'react';

export default function WorkoutLogDisplay() {
  const [isEditable, setIsEditable] = useState(false);
  const workoutLog = useSelector((store) => store.workoutLog);
  const date = useSelector((store) => store.date);
  const dispatch = useDispatch();

  const isAllValuesNull = (obj) => {
    return Object.values(obj).every((value) => value === null);
  };

  return (
    <>
      {isAllValuesNull(workoutLog.exercises[0]) ? (
        <p>Add Exercise to start tracking</p>
      ) : (
        workoutLog.exercises.map((e, i) => (
          <div key={i}>
            <p>
              {e.exercise_name}
              <button onClick={() => setIsEditable(true)}>
                Insert Edit Icon
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: 'REMOVE_EXERCISE',
                    payload: {
                      id: e.detail_id,
                      date: date,
                    },
                  })
                }
              >
                Insert Trash Icon
              </button>
            </p>

            <ul>
              <SetInfoDisplay
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                e={e}
              />
            </ul>

            {/* <table>
            <thead>
                <tr>
                  <th>Set</th>
                  <th>Reps</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {workoutLog.set_info.map((s) => (
                  <tr key={s.set_id}>
                    <td>{s.set_number}</td>
                    <td>{s.reps}</td>
                    <td>{s.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        ))
      )}
    </>
  );
}
