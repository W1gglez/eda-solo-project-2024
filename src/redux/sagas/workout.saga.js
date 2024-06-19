import { takeLeading, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWorkout(action) {
  try {
    const result = yield axios.get('/api/workout');
    console.log(result);
    yield put({ type: 'SET_WORKOUT', payload: result.data });
  } catch (err) {
    console.log('Workout GET request failed:', err);
  }
}

function* addWorkout(action) {
  try {
    yield axios.post('/api/workout/add-workout');
    yield put({ type: 'FETCH_WORKOUT' });
  } catch (err) {
    console.log('Add-workout POST request failed:', err);
  }
}

function* addWorkoutDetails(action) {
  try {
    yield axios.post('/api/workout/add-workout-details', action.payload);
    yield put({ type: 'FETCH_WORKOUT' });
  } catch (err) {
    console.log('Add workout details POST request failed:', err);
  }
}

function* editSet(action) {
  try {
    yield axios.put(
      `/api/workout/update-set/${action.payload.id}`,
      action.payload
    );
    yield put({ type: 'FETCH_WORKOUT' });
  } catch (err) {
    console.log('Edit set UPDATE request failed:', err);
  }
}

function* removeExercise(action) {
  try {
    yield axios.delete(`/api/workout/remove-exercise/${action.payload.id}`);
    yield put({ type: 'FETCH_WORKOUT' });
  } catch (err) {
    console.log('Remove exercise DELETE request failed:', err);
  }
}

function* workoutSaga() {
  yield takeLeading('FETCH_WORKOUT', fetchWorkout);
  yield takeLeading('ADD_WORKOUT', addWorkout);
  yield takeLeading('ADD_EXERCISE', addWorkoutDetails);
  yield takeLeading('EDIT_SET', editSet);
  yield takeLeading('REMOVE_EXERCISE', removeExercise);
}

export default workoutSaga;
