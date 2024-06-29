import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/joy';

export default function ExerciseSearchByMuscleGroup({ setDisplay }) {
  const dispatch = useDispatch();
  const musclegroups = useSelector((store) => store.musclegroups);

  useEffect(() => {
    dispatch({ type: 'FETCH_MUSCLEGROUPS' });
  }, []);

  const handleClick = (e) => {
    dispatch({
      type: 'FETCH_EXERCISES',
      payload: { musclegroup: e.target.innerText },
    });
    setDisplay(true);
  };

  return (
    <Grid
      container
      xs={12}
      sx={{ margin: 'auto', width: '80vw' }}
      spacing={1}
    >
      {musclegroups.map((g) => (
        <Grid
          xs={6}
          sx={{ display: 'flex' }}
          key={g.id}
        >
          <Button
            sx={{
              flex: 1,
              margin: '5px',
              mb: '10px',
              backgroundColor: '#d3d6db',
              border: 'none',
              boxShadow: ' 5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
              ':hover': {
                bgcolor: '#c1c4c9',
              },
            }}
            onClick={handleClick}
          >
            <Typography
              fontWeight={500}
              level='body-lg'
            >
              {g.name}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
