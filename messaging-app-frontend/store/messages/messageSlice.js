import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	messages: [],
	chatData: [],
	receivers: [],

	lastConversations: [],
	userChatMessages: [],
};

export const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		setChatData(state, action) {
			state.chatData = action.payload;
		},
		addChatData(state, action) {
			state.chatData = [...state.chatData, action.payload];
		},
		// Update the messages in chat data to update on the side navigation
		updateChatData(state, action) {
			const { payload } = action;

			const updatedContent = state.chatData.filter((item) => {
				const { messages } = item;
				if (
					item.userId === payload.userId ||
					+item.userId === +payload.userId
				) {
					messages.push(payload.message);
					return item;
				}
				return null;
			});
		},
		// Mark message as read

		markMessageAsRead(state, action) {
			const { payload } = action;
			const updatedContent = state.chatData.filter((item) => {
				const { messages } = item;
				if (
					item.userId === payload.userId ||
					+item.userId === +payload.userId
				) {
					messages.push(payload.message);
					messages.filter((message) => {});
					return item;
				}
				return null;
			});
		},

		addNewReceiver(state, action) {
			state.receivers = action.payload;
		},
		setReceivers(state, action) {
			state.receivers = action.payload;
		},
		setMessages(state, action) {
			state.messages = action.payload;
		},
		addMoreMessages(state, action) {
			state.messages = [...state.messages, action.payload];

			// state.chatData = state.chatData.filter
		},

		// New Actions for optimizing the app
		fetchLastConversationsStart() {},
		setlastConversations(state, action) {
			state.lastConversations = action.payload;
		},
		fetchUserChatMessagesStart() {},
		setUserChatMessages(state, action) {
			state.userChatMessages = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setMessages,
	addMoreMessages,
	addChatData,
	addNewReceiver,
	setChatData,
	setReceivers,
	updateChatData,
	markMessageAsRead,

	//  New Actions for optimizig app
	fetchLastConversationsStart,
	setlastConversations,
	fetchUserChatMessagesStart,
	setUserChatMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
