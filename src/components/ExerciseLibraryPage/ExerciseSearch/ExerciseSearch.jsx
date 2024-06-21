import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';
import ExerciseSearchByMuscleGroup from '../ExerciseSearchByMuscleGroup/ExerciseSearchByMuscleGroup';

export default function ExerciseSearch() {
  const [searchQuery, setSearch] = useState({ search: '', page: 1 });
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'FETCH_EXERCISES', payload: searchQuery });
    setDisplay(true);
    // setSearch({ ...searchQuery, search: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='search'
          value={searchQuery.search}
          onChange={(e) =>
            setSearch({ ...searchQuery, search: e.target.value })
          }
          placeholder='Search'
        />
      </form>
      {display ? (
        <ExerciseDisplay search={searchQuery} />
      ) : (
        <ExerciseSearchByMuscleGroup setDisplay={setDisplay} />
      )}
    </>
  );
}