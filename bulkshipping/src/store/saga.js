
import { all, put, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import api from './../api';
import actionTypes from './actions/constants';
import { setLoginDetails } from './actions'

es6promise.polyfill()

function* login({ data }) {
  try {
    const resp = yield api.loginUser(data);
    if (resp) {
      const data = {};
      if (resp && resp.data && resp.data && resp.data.status === 'success') {
        const { clientType, companyName, role, displayName, managerRoles, userName, _id, clientDisplay } = resp.data;
        data.clientType = clientType;
        data.companyName = companyName;
        data.role = role;
        data.displayName = displayName
        data.managerRoles = managerRoles;
        data.userName = userName;
        data['_id'] = _id;
        data.clientDisplay = clientDisplay;
        yield put(setLoginDetails(data));
      } else {
        yield put(setLoginDetails(''));
      }
    }
  } catch (err) {
    console.log('api error login');
    yield put(setLoginDetails(''));
  }
}


function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOGIN, login),
  ])
}

export default rootSaga