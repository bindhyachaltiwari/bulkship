
import { all,put,takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import api from './../api';
// import 'isomorphic-unfetch'

import actionTypes from './actions/constants';
import {setLoginDetails, setUserDetails } from './actions'

es6promise.polyfill()

function *login ({data}) {
  try {
    const resp = yield api.loginUser(data);
    if(resp) {
      const data = {};
      if(resp && resp.data && resp.data && resp.data.status === 'success') {
        const { userId, menuItems, schoolId, role } = resp.data;
        const schoolDetails = resp.data.schoolDetails;
        data.userId = userId;
        data.schoolId = schoolId;
        data.role = role;
        data.schoolDetails = schoolDetails
        data.menuItem = menuItems;
        if(resp.data.studentId) {
          data.studentId = resp.data.studentId;
        }
        if(resp.data.teacherId) {
          data.teacherId = resp.data.teacherId;
        }
        if(resp.data.parentId) {
          data.parentId = resp.data.parentId;
        }
        yield put(setLoginDetails(data));
      }else {
        // console.log('error login');
        yield put(setLoginDetails(''));
        // throw error
      }
    }
  } catch (err) {
    console.log('api error login');
    yield put(setLoginDetails(''));
    // throw error
  }
}


function *userDetails (configObj) {
  try {
    const resp = yield api.userDetail(configObj);
    if(resp) {
      const data = {};
      data.marks = resp.data.marks || [];
      data.attendance = resp.data.attendance || [];
      yield put(setUserDetails(data));
    }
  }catch(e){
    console.log('saga error occured');
    yield put(setUserDetails({}));
  }
}

function * rootSaga () {
  yield all([
    takeLatest(actionTypes.LOGIN, login),
    // takeLatest(actionTypes.USERDETAIL, userDetails),
  ])
}

export default rootSaga