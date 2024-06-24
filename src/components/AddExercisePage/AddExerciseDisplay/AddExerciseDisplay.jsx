import { useSelector } from 'react-redux';

export default function AddExerciseDisplay() {
  const setInfo = useSelector((store) => store.setInfo);

  return (
    <ul id={setInfo.exercise_name}>
      {setInfo.set_info.map((s, i) => (
        <li key={i}>
          Set {s.set_number}: {s.reps} reps @ {s.weight} lbs
        </li>
      ))}
    </ul>
  );
}
