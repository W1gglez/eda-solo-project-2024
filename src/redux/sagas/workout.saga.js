import { takeLeading, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWorkout(action) {
  const { date } = action.payload;

  try {
    const result = yield axios.get(`/api/workout?date=${date}`);
    let payload;

    if (!result.data.workout_info) {
      payload = {};
    } else {
      payload = result.data.workout_info;
    }

    yield put({ type: 'SET_WORKOUT', payload: payload });
  } catch (err) {
    console.log('Workout GET request failed:', err);
  }
}

function* addWorkout(action) {
  try {
    console.log(action.payload)
    yield axios.post(`/api/workout/add-workout`, action.payload);
    yield put({
      type: 'FETCH_WORKOUT',
      payload: {date: action.payload.date},
    });
  } catch (err) {
    console.log('Add-workout POST request failed:', err);
  }
}

function* addWorkoutDetails(action) {
  try {
    yield axios.post('/api/workout/add-workout-details', action.payload);
    yield put({
      type: 'FETCH_WORKOUT',
      payload: { date: action.payload.date },
    });
  } catch (err) {
    console.log('Add workout details POST request failed:', err);
  }
}

function* editSet(action) {
  try {
    yield axios.put(
      `/api/workout/update-set/${action.payload.set_id}`,
      action.payload
    );
    yield put({
      type: 'FETCH_WORKOUT',
      payload: { date: action.payload.date },
    });
  } catch (err) {
    console.log('Edit set UPDATE request failed:', err);
  }
}

function* removeExercise(action) {
  try {
    yield axios.delete(`/api/workout/remove-exercise/${action.payload.id}`);
    yield put({ type: 'FETCH_WORKOUT', payload: {date: action.payload.date} });
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
