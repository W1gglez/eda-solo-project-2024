import axios from 'axios';
import { put, takeLeading } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* addUserInfo(action) {
  try {
    yield axios.post('/api/user/add-user-info', action.payload);
    yield put({ type: 'FETCH_USER' });
  } catch (err) {
    console.log('Add user info POST request failed:', err);
  }
}

function* userSaga() {
  yield takeLeading('FETCH_USER', fetchUser);
  yield takeLeading('ADD_USER_INFO', addUserInfo);
}

export default userSaga;
