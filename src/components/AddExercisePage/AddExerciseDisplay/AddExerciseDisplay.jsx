import { useSelector } from 'react-redux';

export default function AddExerciseDisplay() {
  const exerciseDetails = useSelector((store) => store.AddExerciseDetails);

  return (
    <ul id={exerciseDetails.exercise_name}>
      {exerciseDetails.set_info.map((s, i) => (
        <li key={i}>
          Set {s.set_number}: {s.reps} reps @ {s.weight} lbs
        </li>
      ))}
    </ul>
  );
}
