import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "./user/userSlice";
import messagesSlice from "./messages/messageSlice";

export const rootReducer = combineReducers({
	user: userSlice,
	messages: messagesSlice,
});

const configStorage = {
	key: "root",
	storage,
	timeout: null,
	whitelist: ["user", "messages"],
};

export default persistReducer(configStorage, rootReducer);
