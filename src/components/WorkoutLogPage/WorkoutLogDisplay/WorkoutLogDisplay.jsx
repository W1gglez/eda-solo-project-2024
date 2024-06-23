import { useDispatch, useSelector } from 'react-redux';
import SetInfoDisplay from '../SetInfoDisplay/SetInfoDisplay';

export default function WorkoutLogDisplay() {
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
        <div>
          <table>
            <tbody>
              {workoutLog.exercises.map((e, i) => (
                <tr key={i}>
                  <td>{e.exercise_name}</td>
                  <td>
                    <table>
                      <tbody>
                        {e.set_info.map((s) => (
                          <SetInfoDisplay
                            s={s}
                            key={s.id}
                          />
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <table>
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
      )}
    </>
  );
}
