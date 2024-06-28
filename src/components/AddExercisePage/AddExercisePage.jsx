import {
  useParams,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Input,
  IconButton,
  Button,
  Typography,
  Modal,
  ModalClose,
  ModalDialog,
  DialogTitle,
  Stack,
  FormControl,
  FormLabel,
} from '@mui/joy';
import { Search, ChevronLeft } from '@mui/icons-material';
import AddExerciseDisplay from './AddExerciseDisplay/AddExerciseDisplay';
import AddSetForm from './AddSetForm/AddSetForm';
import ExerciseDisplay from '../ExerciseLibraryPage/ExerciseDisplay/ExerciseDisplay';

export default function AddExercisePage() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearch] = useState({ search: '', page: 1 });
  const [displayResults, setDisplayResults] = useState(false);

  const date = useSelector((store) => store.date);
  const setInfo = useSelector((store) => store.setInfo);
  const workoutLog = useSelector((store) => store.workoutLog);

  useEffect(() => {
    // dispatch({ type: 'SET_WORKOUT_ID', payload: Number(params.workout_id) });
    setLoading(false);
  }, []);

  const handleLogExercise = () => {
    setInfo.set_info.length > 0
      ? (dispatch({
          type: 'ADD_WORKOUT',
          payload: {
            ...setInfo,
            date: date,
            workout_id: workoutLog.workout_id,
          },
        }),
        dispatch({ type: 'CLEAR_DETAILS' }),
        history.goBack())
      : /*Possibly change to modal/popup*/
        alert('You must add a set before logging.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'FETCH_EXERCISES', payload: searchQuery });
    setDisplayResults(true);
    setSearch({ ...searchQuery, search: '' });
  };

  const [set, setSet] = useState({ reps: 0, weight: 0 });

  const handleAddSet = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_SET_INFO',
      payload: [
        ...setInfo.set_info,
        {
          ...set,
          set_number: setInfo.set_info.length + 1,
        },
      ],
    });
    setDisplayForm(false);
  };

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
          maxWidth: '600px',
        }}
      >
        <Grid
          xs={2}
          sx={{ textAlign: 'center' }}
        >
          <IconButton
            onClick={() => {
              history.goBack();
              dispatch({ type: 'CLEAR_DETAILS' });
            }}
            sx={{
              flex: 0,
              boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',
            }}
          >
            <ChevronLeft />
          </IconButton>
        </Grid>

        <Modal
          open={displayForm}
          onClose={() => setDisplayForm(false)}
        >
          <ModalDialog sx={{ bgcolor: '#d3d6db' }}>
            <ModalClose />

            <DialogTitle>Add Set</DialogTitle>
            <form onSubmit={handleAddSet}>
              <Stack spacing={1}>
                <FormControl>
                  <FormLabel htmlFor='reps'>Reps</FormLabel>
                  <Input
                    autoComplete='off'
                    sx={{
                      margin: '5px',
                      mb: '10px',
                      backgroundColor: '#d3d6db',
                      border: 'none',
                      boxShadow:
                        ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                      '&:focus-within': {
                        border: 'none',
                      },
                      '&:focus-within::before': {
                        boxShadow:
                          ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                    id='reps'
                    type='number'
                    onChange={(e) => setSet({ ...set, reps: e.target.value })}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='weight'>Weight:</FormLabel>
                  <Input
                    autoComplete='off'
                    sx={{
                      margin: '5px',
                      mb: '10px',
                      backgroundColor: '#d3d6db',
                      border: 'none',
                      boxShadow:
                        ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                      '&:focus-within': {
                        border: 'none',
                      },
                      '&:focus-within::before': {
                        boxShadow:
                          ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                    type='number'
                    onChange={(e) => setSet({ ...set, weight: e.target.value })}
                    required
                  />
                </FormControl>
                <Button
                  sx={{
                    background: '#be3144',
                    ':hover': {
                      backgroundColor: '#9e2837',
                      opacity: '95%',
                    },
                  }}
                  type='submit'
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
        {loading ? (
          <></>
        ) : setInfo.exercise_id ? (
          <>
            <Grid
              xs={10}
              sx={{ justifyContent: 'center', alignContent: 'center' }}
            >
              <Typography level='h3'>{setInfo.exercise_name}</Typography>
            </Grid>
            <Grid xs={12}>
              <AddExerciseDisplay />
              {/* {displayForm ? (
                <AddSetForm setDisplayForm={setDisplayForm} />
              ) : ( */}
              <Grid
                container
                xs={12}
                spacing={2}
                sx={{ justifyContent: 'center' }}
              >
                <Grid
                  xs={6}
                  sx={{ display: 'flex', flex: 1 }}
                >
                  <Button
                    sx={{
                      flex: 1,
                      background: '#be3144',
                      ':hover': {
                        backgroundColor: '#9e2837',
                        opacity: '95%',
                      },
                    }}
                    onClick={() => setDisplayForm(true)}
                  >
                    Add Set
                  </Button>
                </Grid>
                <Grid
                  xs={6}
                  sx={{ display: 'flex', flex: 1 }}
                >
                  <Button
                    sx={{
                      flex: 1,
                      background: '#be3144',
                      ':hover': {
                        backgroundColor: '#9e2837',
                        opacity: '95%',
                      },
                    }}
                    onClick={() => handleLogExercise()}
                  >
                    Log Exercise
                  </Button>
                </Grid>
              </Grid>
              {/* )} */}
            </Grid>
          </>
        ) : (
          <>
            <Grid
              xs={10}
              sx={{ alignContent: 'center' }}
            >
              <Typography level='h3'>Add Exercise</Typography>
            </Grid>
            <Grid xs={12}>
              <form onSubmit={handleSubmit}>
                <Input
                  sx={{
                    margin: '5px',
                    mb: '10px',
                    backgroundColor: '#d3d6db',
                    border: 'none',
                    boxShadow:
                      ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',
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
            {displayResults && (
              <ExerciseDisplay
                search={searchQuery}
                setDisplayForm={setDisplayForm}
              />
            )}
          </>
        )}
      </Grid>
    </Container>
  );
}
