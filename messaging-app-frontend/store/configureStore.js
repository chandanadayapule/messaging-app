/* eslint-disable import/no-anonymous-default-export */
// import { applyMiddleware, combineReducers, createStore } from "redux";

import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import createSagaMiddle from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();

// export const middlewares = [thunk, sagaMiddleware];
// if (process.env.NODE_ENV === `development`) {
// 	middlewares.push(logger);
// }
export const store = configureStore({
	// rootReducer, applyMiddleware(...middlewares)
	reducer: rootReducer,
	middleware:
		process.env.NODE_ENV !== "production"
			? (getDefaultMiddleware) =>
					getDefaultMiddleware().concat(logger).concat(sagaMiddleware)
			: (getDefaultMiddleware) =>
					getDefaultMiddleware().concat(sagaMiddleware),
	devTools: process.env.NODE_ENV !== "production",
});

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga)
export default {
	store,
	persistor,
};
