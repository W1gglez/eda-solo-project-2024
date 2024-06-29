import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import ExerciseSearch from './ExerciseSearch/ExerciseSearch';
import Button from '@mui/joy/Button';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { Container, Grid, Typography } from '@mui/joy';

export default function ExerciseLibrary() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: '90vw',
          maxWidth: '400px',
        }}
      >
        <Typography level='title-lg'>Exercise Library</Typography>
        {/* Search Options w/ display */}
        <ExerciseSearch />
        {user.id ? (
          <Grid
            container
            xs={12}
          >
            <Grid
              xs
              sx={{ display: 'flex' }}
            >
              <Button
                sx={{
                  flex: 1,
                  background: '#be3144',
                  ':hover': { backgroundColor: '#9e2837', opacity: '95%' },
                }}
                onClick={() => history.push('/workout-log')}
              >
                Workout Log
              </Button>
            </Grid>
            <Grid
              xs
              sx={{ display: 'flex' }}
            >
              <Button
                sx={{
                  flex: 1,
                  background: '#be3144',
                  ':hover': { backgroundColor: '#9e2837', opacity: '95%' },
                }}
                onClick={() => history.push('/nutrition-log')}
              >
                Nutrition Log
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            xs={12}
            sx={{ textAlign: 'center' }}
          >
            <Grid
              xs
              sx={{ display: 'flex' }}
            >
              <Button
                endDecorator={<LockOutlined />}
                color=''
                sx={{
                  flex: 1,
                  backgroundColor: '#be3144',
                  color: 'white',
                  opacity: '75%',
                }}
                disabled
              >
                Workout Log
              </Button>
            </Grid>
            <Grid
              xs
              sx={{ display: 'flex' }}
            >
              <Button
                endDecorator={<LockOutlined />}
                disabled
                color=''
                sx={{
                  flex: 1,
                  backgroundColor: '#be3144',
                  color: 'white',
                  opacity: '75%',
                }}
              >
                Nutrition Log
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
