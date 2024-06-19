import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function SetInfoDisplay({ e, isEditable }) {
  const dispatch = useDispatch();
  const [newReps, setReps] = useState(0);
  const [newWeight, setWeight] = useState(0);

  return (
    <>
      {e.set_info.map((s, i) => (
        <>
          {isEditable ? (
            <>
              <li key={i}>
                Set {s.set_number}
                :
                <input
                  type='text'
                  value={newReps}
                  onChange={(e) => setReps(e.target.value)}
                />
                reps
                <br />
                @
                <input
                  type='text'
                  value={newWeight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                lbs
              </li>
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_SET',
                    payload: {
                      set_number: newSetNumber,
                      reps: newReps,
                      weight: newWeight,
                    },
                  })
                }
              >
                Update Set
              </button>
            </>
          ) : (
            <li key={i}>
              Set {s.set_number}: {s.reps} reps @ {s.weight} lbs
            </li>
          )}
        </>
      ))}
    </>
  );
}
