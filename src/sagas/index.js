import { all } from 'redux-saga/effects';
import profileSaga from './profileSaga';

export default function* rootSaga() {
	yield all([profileSaga()]);
}
