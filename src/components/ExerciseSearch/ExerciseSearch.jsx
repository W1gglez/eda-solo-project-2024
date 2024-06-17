import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';

export default function ExerciseSearch() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'FETCH_EXERCISES', payload: { search } });
    setDisplay(true);
    setSearch('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
        />
      </form>
      {display ? <ExerciseDisplay /> : <></>}
    </>
  );
}
