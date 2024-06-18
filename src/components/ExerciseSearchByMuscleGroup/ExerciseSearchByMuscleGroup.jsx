import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ExerciseSearchByMuscleGroup() {
  const dispatch = useDispatch();
  const musclegroups = useSelector((store) => store.musclegroups);

  useEffect(() => {
    useDispatch({ type: 'FETCH_MUSCLEGROUPS' });
  }, []);

  const handleClick = (e) => {
    dispatch({ type: 'FETCH_EXERCISES', payload: { search: e.target.value } });
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
