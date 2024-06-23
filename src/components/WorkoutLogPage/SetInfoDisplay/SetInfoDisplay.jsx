import { useDispatch } from 'react-redux';
import { useState } from 'react';
import SetInfoDisplayItem from './SetInfoDisplayItem/SetInfoDisplayItem';

export default function SetInfoDisplay({ s }) {
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();

  return isEditable ? (
    <SetInfoDisplayItem
      s={s}
      key={s.id}
      setEdit={setIsEditable}
    />
  ) : (
    <tr>
      <td>
        Set {s.set_number}: {s.reps} reps @ {s.weight} lbs
      </td>
      <td>
        <button onClick={() => setIsEditable(true)}>Insert Edit Icon</button>
      </td>
    </tr>
  );
}
