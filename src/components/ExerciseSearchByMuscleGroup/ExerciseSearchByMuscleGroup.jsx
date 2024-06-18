import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ExerciseSearchByMuscleGroup({ setDisplay }) {
  const dispatch = useDispatch();
  const musclegroups = useSelector((store) => store.musclegroups);

  useEffect(() => {
    dispatch({ type: 'FETCH_MUSCLEGROUPS' });
  }, []);

  const handleClick = (e) => {
    dispatch({
      type: 'FETCH_EXERCISES',
      payload: { musclegroup: e.target.value },
    });
    setDisplay(true);
  };

  return (
    <>
      {musclegroups.map((g) => (
        <button
          key={g.id}
          value={g.name}
          onClick={handleClick}
        >
          {g.name}
        </button>
      ))}
    </>
  );
}
