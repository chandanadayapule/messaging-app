import { all, call, takeLatest, put } from "redux-saga/effects";
import {
	handleFetchLastConversations,
	handleFetchUserMessages,
} from "./messages.helper";
import {
	fetchLastConversationsStart,
	fetchUserChatMessagesStart,
	setlastConversations,
	setUserChatMessages,
} from "./messageSlice";

export function* fetchLastConversations({ payload }) {
	try {
		const messages = yield handleFetchLastConversations(payload);
		yield put(setlastConversations(messages));
	} catch (error) {
		console.log(error);
	}
}
export function* onFetchLastConversationsStart() {
	yield takeLatest(fetchLastConversationsStart.type, fetchLastConversations);
}

export function* fetchUserConversations({ payload }) {
	try {
		const messages = yield handleFetchUserMessages(payload);

		yield put(setUserChatMessages(messages));
		yield put(fetchLastConversationsStart(payload));
	} catch (error) {
		console.log(error);
	}
}

export function* onFetchUserConversationsStart() {
	yield takeLatest(fetchUserChatMessagesStart.type, fetchUserConversations);
}

export function* fetchFestiveSpecialProducts({ payload }) {
	try {
		yield put(setSectionLoading(true));
		const products = yield handleFetchFilteredProducts(payload);
		yield put(setFestiveSpecialProducts(products));
		yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
	}
}
export function* onFetchFestiveSpecialProductsStart() {
	yield takeLatest(
		fetchFestiveSpecialProductsStart.type,
		fetchFestiveSpecialProducts,
	);
}

export default function* messagesSagas() {
	yield all([
		call(onFetchLastConversationsStart),
		call(onFetchUserConversationsStart),
	]);
}
