export default function AddExerciseDisplay({ exerciseDetails }) {
  return (
    <ul>
      {exerciseDetails.set_info.map((s, i) => (
        <li key={i}>
          Set {s.set_number}: {s.reps} reps @ {s.weight} lbs
        </li>
      ))}
    </ul>
  );
}
