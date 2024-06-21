import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalorieTrackerProgressBars from './CalorieTrackerProgressBars/CalorieTrackerProgressBars';
import CalorieTrackerDisplayItem from './CalorieTrackerDisplayItem/CalorieTrackerDisplayItem';

export default function CalorieTrackerDisplay() {
  const calorieTracker = useSelector((store) => store.calorieTracker);
  const date = useSelector((store) => store.date);
  const [editable, setEditable] = useState();
  const dispatch = useDispatch();

  const isAllValuesNull = (obj) => {
    return Object.values(obj).every((value) => value === null);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ENTRY', payload: { date: date, id } });
  };

  return (
    <>
      {isAllValuesNull(calorieTracker.log_entrys[0]) ? (
        <p>Add Entry to start tracking</p>
      ) : (
        <>
          <CalorieTrackerProgressBars />
          <table>
            <tbody>
              {calorieTracker.log_entrys.map((f) => {
                return (
                  <tr key={f.entry_id}>
                    <td>{f.name}</td>

                    <CalorieTrackerDisplayItem
                      f={f}
                      setEditable={setEditable}
                      editable={editable}
                    />
                    {editable ?? (
                      <>
                        <td>
                          <button onClick={() => setEditable(true)}>
                            Insert Edit Icon
                          </button>
                        </td>

                        <td>
                          <button onClick={() => handleDelete(f.entry_id)}>
                            Insert Trash Icon
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
