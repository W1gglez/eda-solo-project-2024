import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';
import ExerciseSearchByMuscleGroup from '../ExerciseSearchByMuscleGroup/ExerciseSearchByMuscleGroup';
import { Grid, Input } from '@mui/joy';
import { Search } from '@mui/icons-material';

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
      <Grid xs={12}>
        <form onSubmit={handleSubmit}>
          <Input
            sx={{
              margin: '5px',
              mb: '10px',
              backgroundColor: '#d3d6db',
              border: 'none',
              boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',
              '&:focus-within': {
                border: 'none',
              },
              '&:focus-within::before': {
                boxShadow:
                  ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                borderRadius: '8px',
              },
            }}
            endDecorator={<Search />}
            type='search'
            value={searchQuery.search}
            onChange={(e) =>
              setSearch({ ...searchQuery, search: e.target.value })
            }
            placeholder='Search'
          />
        </form>
      </Grid>
      {display ? (
        <ExerciseDisplay search={searchQuery} />
      ) : (
        <ExerciseSearchByMuscleGroup setDisplay={setDisplay} />
      )}
    </>
  );
}
