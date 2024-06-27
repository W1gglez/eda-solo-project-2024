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
      sx={{ margin: 'auto', width: '80vw' }}
      spacing={2}
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
          {exercises.data?.map((e, i) => {
            return (
              <>
                <Typography
                  key={e.id}
                  onClick={() => {
                    history.push(`/exercise-details/${e.id}`);
                  }}
                >
                  {e.name}
                  {location.pathname === '/home' ? (
                    <></>
                  ) : (
                    <IconButton
                      variant='success'
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
                </Typography>
              </>
            );
          })}
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
            }}
          >
            <IconButton
              sx={{
                flex: 1,
              }}
              onClick={() => {
                search.page = search.page > 1 ? search.page - 1 : search.page;
                dispatch({ type: 'FETCH_EXERCISES', payload: search });
              }}
            >
              <ChevronLeft />
            </IconButton>
            <Divider />
            <IconButton
              sx={{
                flex: 1,
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
