import axios from 'axios';
import { takeLeading, put } from 'redux-saga/effects';

function* fetchExercises(action) {
  let { search, page, musclegroup } = action.payload;
  let query;

  if (!musclegroup) {
    query = `/api/exercise?search=${search}&page=${page}`;
  } else {
    query = `/api/exercise?musclegroup=${musclegroup}&page=${page}`;
  }

  try {
    const result = yield axios.get(query);
    console.log('search result', result);
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

export default function* exerciseSaga() {
  yield takeLeading('FETCH_EXERCISES', fetchExercises);
  yield takeLeading('FETCH_MUSCLEGROUPS', fetchMusclegroups);
}
