import { useDispatch, useSelector } from 'react-redux';

export default function ExerciseSearchByMuscleGroup() {
  const dispatch = useDispatch();
  const musclegroups = useSelector((store) => store.musclegroups);

  const handleClick = (e) => {
    dis;
  };

  return (
    <>
      {musclegroups.map((g) => (
        <button
          value={g.name}
          onClick={handleClick}
        >
          {g.name}
        </button>
      ))}
    </>
  );
}
