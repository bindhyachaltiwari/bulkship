import actionTypes from './constants';
  
export const setLoginDetails = (data) => {
  return {
    type: actionTypes.LOGIN_ASYNC,
    data
  };
}

export const failure = (error) => {
  return {
    type: actionTypes.FAILURE,
    error
  }
}

export const setUserDetails = (data) => {
  return {
    type: actionTypes.USERDETAIL_ASYNC,
    data
  }
}

export const setActiveTab= (data) => {
  return {
    type: actionTypes.SET_ACTIVE_TAB,
    data
  }
}

export const setHolidays = (data) => {
  return {
    type: actionTypes.SET_HOLIDAYS,
    data
  }
}

export const setOverlay = (data) => {
  return {
    type: actionTypes.SET_OVERLAY,
    data
  }
}