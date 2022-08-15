import API_URLS from "constants/API_URLS";
import { resolve } from "styled-jsx/css";
import authFetch from "utils/authFetch";

export const handleApiCalls = (url, data) => {
	return new Promise((resolve, reject) => {
		authFetch(url, data)
			.then((response) => {
				const result = response;
				return resolve(result);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
};

export const handleFetchLastConversations = (data = {}) => {
	const { userName, token } = data.currentUser;
	const url = `${API_URLS.GET_LAST_CONVERSATION_URL}?username=${userName}`;
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Jwt ${token}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				resolve(json.result);
				// dispatch(setChatData(json.result));
			})
			.catch((error) => {
				console.error(error);
				reject(error);
			});
	});
};

export const handleFetchUserMessages = (data = {}) => {
	const { userName, token } = data.currentUser;
    const receiverUserName = data.receiverUserName
	// http://147.182.225.167/api/conversations?msg_sender=test&msg_receiver=test3
	const fetchMessageURL = `${API_URLS.GET_CONVERSATIONS}?msg_sender=${userName}&msg_receiver=${receiverUserName}`;

	return new Promise((resolve, reject) => {
		fetch(fetchMessageURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Jwt ${token}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				resolve(json);
				// dispatch(setMessages(json));
			})
			.catch((error) => {
				console.error(error);
				reject(error);
			});
	});
};
