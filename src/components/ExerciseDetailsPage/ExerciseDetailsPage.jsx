import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import ExerciseStepItem from './ExerciseStepItem';
import { IconButton, Container, AspectRatio, Grid } from '@mui/joy';
import { ChevronLeft } from '@mui/icons-material';
import { List } from '@mui/material';

export default function ExerciseDetailsPage({ id }) {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const exerciseDetails = useSelector((store) => store.exerciseDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_EXERCISE_DETAILS', payload: { id: params.id } });
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Grid
        sx={{
          width: '80vw',
          maxWidth: '600px',
        }}
      >
        <IconButton
          onClick={() => history.goBack()}
          sx={{
            mb: 2,
            flex: 0,
            boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',
          }}
        >
          <ChevronLeft />
        </IconButton>
        <Grid xs>
          <AspectRatio sx={{ borderRadius: 8 }}>
            {exerciseDetails.video_url ? (
              <video src={exerciseDetails.video_url} />
            ) : (
              <img src='/Vidoe-placeholder.png' />
            )}
          </AspectRatio>

          <h2>{exerciseDetails.name}</h2>
          <List>
            {exerciseDetails.steps?.map((s) => (
              <ExerciseStepItem
                s={s}
                key={s.step_number}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
