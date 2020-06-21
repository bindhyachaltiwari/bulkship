import actionTypes from './actions/constants'

export const exampleInitialState = {
  detail: {
    userId: '',
    role: '',
    schoolId:0,
    teacherId:0,
    parentId:0
  },
  loggedIn: null,
  ui: {
    menuItem: [],
    userDetails: {},
    activeTab: '',
    activeOverlay: '',
    holidays: {
      public: [],
      local: []
    }
  }
}

/* function reducer (state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_ASYNC:
        let loggedIn = false;
        const newStateObj = {...state};
        let uiObj = {...newStateObj.ui};
        let userId = '';
        if(action.data) {
          const { data } = action;
          loggedIn = action.data === 'signout' ? null : true;
          uiObj.menuItem = data.menuItems;
          userId = data.userId;
        }
        newStateObj.ui = {...uiObj};
        return {
          ...state,
          ...{ userId, loggedIn, ...uiObj }
        };
    case actionTypes.USERDETAIL_ASYNC:
        const uiObjTemp = state.ui;
        if(action.data) {
          uiObjTemp.userDetails = action.data;
        }
        return {
          ...state,
          ...uiObjTemp
        };
    default:
      return {...state};
  }
} */

function reducer (state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_ASYNC:
        let loggedIn = false;
        const uiObj = Object.assign({}, state.ui);
        uiObj.menuItem = action.data.menuItem;
        let detailObj = {
          userId: action.data.userId || '',
          role: action.data.role || '',
          studentId: action.data.studentId || 0,
          schoolId: action.data.schoolId || 0,
          teacherId: action.data.teacherId || 0,
          parentId: action.data.parentId || 0,
          schoolDetails :action.data.schoolDetails || {}
        };
        if(action.data) {
          loggedIn = action.data === 'signout' ? null : true;
        }
        return Object.assign({}, state, {
          detail: {...detailObj},
          loggedIn,
          ui:uiObj
        });
    case actionTypes.USERDETAIL_ASYNC:
        const uiObjTemp = Object.assign({}, state.ui);
        if(action.data) {
          uiObjTemp.userDetails = action.data;
        }
        return Object.assign({}, state, {
          ui: uiObjTemp
        });
    case actionTypes.SET_ACTIVE_TAB:
      const uiObjTemp2 = Object.assign({}, state.ui);
      if(action.data) {
        uiObjTemp2.activeTab = action.data;
      }
      return Object.assign({}, state, {
        ui: uiObjTemp2
      });
    case actionTypes.SET_HOLIDAYS:
        const uiObjTemp3 = Object.assign({}, state.ui);
        if(action.data) {
          uiObjTemp3.holidays.public = action.data;
        }
        return Object.assign({}, state, {
          ui: uiObjTemp3
        });
    case actionTypes.SET_OVERLAY: 
        const uiObjTemp4 = Object.assign({}, state.ui);
        uiObjTemp4.activeOverlay = action.data;
        return Object.assign({}, state, {
          ui: uiObjTemp4
        }); 
    default:
      return {...state};
  }
}

export default reducer;