import { useSelector } from 'react-redux';
import { Stack } from '@mui/joy';
import { Grid } from '@mui/joy';
import ExerciseCard from './ExerciseCard/ExerciseCard';

export default function WorkoutLogDisplay() {
  const workoutLog = useSelector((store) => store.workoutLog);

  const isAllValuesNull = (obj) => {
    return Object.values(obj).every((value) => value === null);
  };

  return (
    <Grid
      xs={12}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      {isAllValuesNull(workoutLog.exercises[0]) ? (
        <p>Add Exercise to start tracking</p>
      ) : (
        <Stack
          spacing={2}
          sx={{ width: '80vw' }}
        >
          {workoutLog.exercises?.map((e, i) => (
            <ExerciseCard
              key={i}
              e={e}
              i={i}
            />
          ))}
        </Stack>
      )}
    </Grid>
  );
}
