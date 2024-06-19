import { useState } from 'react';

export default function SetInfoDisplay({ e, isEditable }) {
  const [newSetNumber, setSetNumber] = useState('');
  const [newReps, setReps] = useState();
  const [newWeight, setWeight] = useState();

  return (
    <>
      {e.set_info.map((s, i) => (
        <>
          {isEditable ? (
            <li key={i}>
              Set {s.set_number}: {s.reps} reps @ {s.weight} lbs
            </li>
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
