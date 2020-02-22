import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/reducer';
import createSagaMiddleware from 'redux-saga';
import watcherSaga from '../sagas/saga';

const initializeMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(initializeMiddleware));
initializeMiddleware.run(watcherSaga);
export default store;