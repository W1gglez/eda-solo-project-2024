import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EditSetInfo({ s, i, setEdit }) {
  const dispatch = useDispatch();
  const date = useSelector((store) => store.date);
  const [newReps, setReps] = useState(s.reps);
  const [newWeight, setWeight] = useState(s.weight);

  return (
    <>
      <li key={i}>
        Set {s.set_number}
        :
        <input
          type='number'
          value={newReps}
          onChange={(e) => setReps(e.target.value)}
        />
        reps
        <br />
        @
        <input
          type='number'
          value={newWeight}
          onChange={(e) => setWeight(e.target.value)}
        />
        lbs
      </li>
      <button
        onClick={() => {
          dispatch({
            type: 'EDIT_SET',
            payload: {
              ...s,
              reps: Number(newReps),
              weight: Number(newWeight),
              date: date,
            },
          });
          setEdit(false);
        }}
      >
        Update Set
      </button>
    </>
  );
}
