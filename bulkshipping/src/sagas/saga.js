
import {takeEvery,call,put} from 'redux-saga/effects';

export default function* watcherSaga() {
yield takeEvery('APICALL',workerFunction)
}
function* workerFunction() {
    try {
        const finalData = yield call(getAPIData);
        //const finalResponse = yield finalData.json();
        yield put({type:'DATA-LOADED',finalData});
    }
    catch(e){
        yield put({type:'DATA-ERROR',finalData:e});
    }   
}
function getAPIData() {
 return fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
     response.json()
 );
// return fetch('https://jsonplaceholder.typicode.com/posts').then(function(response) {
// response.json();
// })
}

