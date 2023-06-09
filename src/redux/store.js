import { createStore ,applyMiddleware, compose} from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = compose(applyMiddleware(sagaMiddleware))(createStore)(
	rootReducer
);

sagaMiddleware.run(rootSaga);

export default store;