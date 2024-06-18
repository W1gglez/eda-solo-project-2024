import axios from 'axios';
import { takeLatest, put, take } from 'redux-saga/effects';

function* fetchExercises(action) {
  const { search, page, musclegroup } = action.payload;
  try {
    const result = yield axios.get(
      `/api/exercise?search=${search}&musclegroup=${musclegroup}&page=${page}`
    );
    console.log(result);
    yield put({ type: 'SET_EXERCISES', payload: result.data });
  } catch (err) {
    console.log('Fetch exercises GET failed', err);
  }
}

function* fetchMusclegroups(action) {
  try {
    const result = yield axios.get('/api/exercise/musclegroups');
    yield put({ type: 'SET_GROUPS' });
  } catch (err) {
    console.log('Fetch musclegroups GET failed', err);
  }
}

export default function* exerciseSaga() {
  yield takeLatest('FETCH_EXERCISES', fetchExercises);
  yield takeLatest('FETCH_MUSCLEGROUPS', fetchMusclegroups);
}
