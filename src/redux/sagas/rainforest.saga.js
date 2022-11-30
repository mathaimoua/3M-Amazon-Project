import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* defaultSearch() {
  try {
    const response = yield axios.get('/api/rainforest/default')
    yield console.log('payload is', response.data)
    yield put({ type: 'SET_DEFAULT_SEARCH_ITEMS', payload: response.data });
  } catch (error) {
    console.log('Error fetching default results.', error);
  }
}

function* rainforestSaga() {
  yield takeLatest('DEFAULT_SEARCH', defaultSearch)
}

export default rainforestSaga;
