import { takeLeading, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCalorieLog(action) {
  const { date } = action.payload;
  try {
    const result = yield axios.get(`/api/calorie_tracker?date=${date}`);
    let payload;

    if (!result.data[0]) {
      payload = {};
    } else {
      payload = result.data[0];
    }
    console.log('GET results:', result);
    yield put({ type: 'SET_TRACKER', payload: payload });
  } catch (err) {
    console.log('Calorie Log GET request failed', err);
  }
}

function* createNewLog(action) {
  try {
    yield axios.post('/api/calorie_tracker/add-log');
    yield put({
      type: 'FETCH_TRACKER',
      payload: { date: action.payload.date },
    });
  } catch (err) {
    console.log('Create new log POST request failed', err);
  }
}

function* addLogEntry(action) {
  try {
    yield axios.post('/api/calorie_tracker/add-log-entry', action.payload);
    yield put({
      type: 'FETCH_TRACKER',
      payload: { date: action.payload.date },
    });
  } catch (err) {
    console.log('Add log entry POST request failed', err);
  }
}

function* updateEntry(action) {
  try {
    yield axios.put(
      `/api/calorie_tracker/update-entry/${action.payload.id}`,

      action.payload
    );
    yield put({
      type: 'FETCH_TRACKER',
      payload: { date: action.payload.date },
    });
  } catch (err) {
    console.log('Update log PUT request failed', err);
  }
}

function* removeEntry(action) {
  try {
    yield axios.delete(`/api/calorie_tracker/remove-entry/${action.payload}`);
    yield put({
      type: 'FETCH_TRACKER',
      payload: { date: action.payload.date },
    });
  } catch (err) {
    console.log('Remove entry DELETE failed', err);
  }
}

function* calorieLogSaga() {
  yield takeLeading('FETCH_TRACKER', fetchCalorieLog);
  yield takeLeading('CREATE_LOG', createNewLog);
  yield takeLeading('ADD_ENTRY', addLogEntry);
  yield takeLeading('UPDATE_ENTRY', updateEntry);
  yield takeLeading('DELETE_ENTRY', removeEntry);
}

export default calorieLogSaga;
