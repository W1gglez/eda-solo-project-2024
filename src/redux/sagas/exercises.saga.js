import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* fetchExcersises(action) {
  const { search, page } = action.payload;
  try {
    const result = yield axios.get(
      `/api/excerise?search=${search}&page=${page}`
    );
    yield put({ type: 'SET_EXERCISES', payload: result.data });
  } catch (err) {
    console.log('Fetch exercises GET failed', err);
  }
}

export default function* exerciseSaga() {
  yield takeLatest('FETCH_EXERCISES', fetchExcersises);
}
