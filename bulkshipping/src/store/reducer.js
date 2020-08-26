import actionTypes from './actions/constants'

export const exampleInitialState = {
  detail: {
    userName: '',
    companyName: '',
    displayName: '',
    role: '',
    clientType: '',
    _id: 0,
    managerRoles: [],
    clientDisplay: []
  },
  loggedIn: null,
  ui: {
    userDetails: {},
    activeTab: '',
    activeOverlay: '',
  }
}

function reducer(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_ASYNC:
      let loggedIn = false;
      let detailObj = {
        userName: action.data.userName || '',
        companyName: action.data.companyName || '',
        displayName: action.data.displayName || '',
        role: action.data.role || '',
        clientType: action.data.clientType || '',
        _id: action.data['_id'] || 0,
        managerRoles: action.data.managerRoles || [],
        clientDisplay: action.data.clientDisplay || [],
      };
      if (action.data) {
        loggedIn = action.data === 'signout' ? null : true;
      }
      if (action.data !== 'signout') {
        localStorage.setItem('detail', JSON.stringify({...detailObj}));
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
        localStorage.setItem('ui', JSON.stringify(state.ui));
      }
      return Object.assign({}, state, {
        detail: { ...detailObj },
        loggedIn,
        ui: Object.assign({}, state.ui)
      });
    case actionTypes.USERDETAIL_ASYNC:
      const uiObjTemp = Object.assign({}, state.ui);
      if (action.data) {
        uiObjTemp.userDetails = action.data;
      }
      return Object.assign({}, state, {
        ui: uiObjTemp
      });
    case actionTypes.SET_ACTIVE_TAB:
      const uiObjTemp2 = Object.assign({}, state.ui);
      if (action.data) {
        uiObjTemp2.activeTab = action.data;
      }
      return Object.assign({}, state, {
        ui: uiObjTemp2
      });
    case actionTypes.SET_OVERLAY:
      const uiObjTemp4 = Object.assign({}, state.ui);
      uiObjTemp4.activeOverlay = action.data;
      return Object.assign({}, state, {
        ui: uiObjTemp4
      });
    default:
      return { ...state };
  }
}

export default reducer;