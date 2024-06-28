import { Add } from '@mui/icons-material';
import {
  Stack,
  Grid,
  Typography,
  IconButton,
  Divider,
  ButtonGroup,
} from '@mui/joy';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min';
import { Box } from '@mui/material';

export default function ExerciseDisplay({ search }) {
  const location = useLocation();
  const exercises = useSelector((store) => store.exercises);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(location);

  return (
    <Grid
      container
      xs={12}
      sx={{ margin: 'auto', width: '80vw', maxWidth: '550px' }}
      spacing={4}
    >
      <Grid xs={12}>
        <Stack
          divider={<Divider />}
          spacing={0.5}
          sx={{
            maxHeight: '300px',
            overflow: 'auto',
          }}
        >
          {exercises.data?.map((e, i) => (
            <Box
              key={i}
              sx={{ display: 'flex' }}
            >
              <Typography
                sx={{ flex: 1 }}
                key={e.id}
                onClick={() => {
                  history.push(`/exercise-details/${e.id}`);
                }}
              >
                {e.name}
              </Typography>
              {location.pathname === '/home' ? (
                <></>
              ) : (
                <IconButton
                  sx={{ flex: 0.5 }}
                  onClick={() =>
                    dispatch({
                      type: 'SET_EXERCISE_ID',
                      payload: {
                        exercise_id: e.id,
                        exercise_name: e.name,
                      },
                    })
                  }
                >
                  <Add />
                </IconButton>
              )}
            </Box>
          ))}
        </Stack>
      </Grid>
      {exercises.totalPages <= 1 ? (
        <></>
      ) : (
        <Grid
          container
          xs={12}
          spacing={2}
          sx={{ display: 'flex', justifyContent: 'Center' }}
        >
          <ButtonGroup
            sx={{
              flex: 1,
              boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',
            }}
          >
            <IconButton
              sx={{
                flex: 1,
                ':hover': {
                  bgcolor: 'inherit',
                },
                '&:active': {
                  bgcolor: '#c1c4c9',
                  boxShadow:
                    ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                },
              }}
              onClick={() => {
                search.page = search.page > 1 ? search.page - 1 : search.page;
                dispatch({ type: 'FETCH_EXERCISES', payload: search });
              }}
            >
              <ChevronLeft />
            </IconButton>
            <Divider orientation='vertical' />
            <IconButton
              sx={{
                flex: 1,
                ':hover': {
                  bgcolor: 'inherit',
                },
                '&:active': {
                  bgcolor: '#c1c4c9',
                  boxShadow:
                    ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                },
              }}
              onClick={() => {
                search.page =
                  search.page < exercises.totalPages
                    ? search.page + 1
                    : search.page;
                dispatch({ type: 'FETCH_EXERCISES', payload: search });
              }}
            >
              <ChevronRight />
            </IconButton>
          </ButtonGroup>
        </Grid>
      )}
    </Grid>
  );
}
