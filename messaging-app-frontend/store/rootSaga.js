import { all, call } from "redux-saga/effects";
import messagesSagas from "./messages/messages.saga";

export default function* rootSaga() {
	// yield all([call(userSagas)]);
	yield all([
		// call(userSagas),
		call(messagesSagas),
	]);
}
