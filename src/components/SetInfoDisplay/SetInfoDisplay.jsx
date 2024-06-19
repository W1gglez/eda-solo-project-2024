export default function SetInfoDisplay({ e, isEditable }) {
  return (
    <>
      {e.set_info.map((s) => (
        <li key={s.set_id}>
          Set {s.set_number}: {s.reps} reps @ {s.weight} lbs
        </li>
      ))}
    </>
  );
}
