import EditSetInfo from './EditSetInfo/EditSetInfo';

export default function SetInfoDisplay({ e, isEditable, setIsEditable }) {
  return (
    <>
      {e.set_info.map((s, i) => {
        return isEditable ? (
          <EditSetInfo
            s={s}
            i={i}
            setEdit={setIsEditable}
          />
        ) : (
          <li key={i}>
            Set {s.set_number}: {s.reps} reps @ {s.weight} lbs
          </li>
        );
      })}
    </>
  );
}
