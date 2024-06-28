import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import WorkoutLogDisplay from './WorkoutLogDisplay/WorkoutLogDisplay';
import DateSelector from '../DateSelector/DateSelector';
import { Button, Container, Typography, Grid } from '@mui/joy';

export default function WorkoutLogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const workoutLog = useSelector((store) => store.workoutLog);
  const date = useSelector((store) => store.date);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    dispatch({
      type: 'FETCH_WORKOUT',
      payload: { date: date },
    });
    setIsLoading(false);
  }, [date]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          width: '90vw',
          maxWidth: '400px',
        }}
      >
        <Grid
          xs={12}
          sx={{ textAlign: 'center' }}
        >
          <Typography level='h3'>Workout Log</Typography>
        </Grid>
        <Grid
          xs={12}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <DateSelector />
        </Grid>

        {isLoading ? (
          <></>
        ) : (
          <>
            {workoutLog.exercises && <WorkoutLogDisplay />}
            <Grid
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                sx={{
                  background: '#be3144',
                  ':hover': { backgroundColor: '#9e2837', opacity: '95%' },
                }}
                onClick={() => {
                  history.push(`/add-exercise`);
                }}
              >
                Add Exercise
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
