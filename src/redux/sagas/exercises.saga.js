import axios from 'axios';
import { takeLeading, put } from 'redux-saga/effects';

function* fetchExercises(action) {
  let { search, musclegroup } = action.payload;
  let query;

  if (!musclegroup) {
    query = `/api/exercise?search=${search}`; 
  } else {
    query = `/api/exercise?musclegroup=${musclegroup}`;
  }

  try {
    const result = yield axios.get(query);
    yield put({
      type: 'SET_EXERCISES',
      payload: result.data,
    });
  } catch (err) {
    console.log('Fetch exercises GET failed', err);
  }
}

function* fetchMusclegroups(action) {
  try {
    const result = yield axios.get('/api/exercise/musclegroups');
    yield put({ type: 'SET_GROUPS', payload: result.data });
  } catch (err) {
    console.log('Fetch musclegroups GET failed', err);
  }
}

function* fetchExerciseDetails(action) {
  const options = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${action.payload.id}`,
    headers: {
      'x-rapidapi-key': 'de6cf2fbaemsh3cc2d204aa8e529p11d6e2jsnc4b45d83ca37',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    },
  };

  try {
    const result = yield axios.request(options);
    // const result = yield axios.get(
    //   `/api/exercise/details/${action.payload.id}`
    // );
    yield put({ type: 'SET_EXERCISE_DETAILS', payload: result.data });
  } catch (err) {
    console.log('Fetch exercise details GET failed', err);
  }
}

export default function* exerciseSaga() {
  yield takeLeading('FETCH_EXERCISES', fetchExercises);
  yield takeLeading('FETCH_MUSCLEGROUPS', fetchMusclegroups);
  yield takeLeading('FETCH_EXERCISE_DETAILS', fetchExerciseDetails);
}
