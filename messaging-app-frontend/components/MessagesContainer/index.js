import React from "react";
import {
	Typography,
	Box,
	Avatar,
	Stack,
	OutlinedInput,
	IconButton,
} from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserChatMessagesStart } from "store/messages/messageSlice";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import API_URLS from "constants/API_URLS";
import authFetch from "utils/authFetch";
import lodash from "lodash";
import { format, formatDistance } from "date-fns";
import { utcToZonedTime, toDate } from "date-fns-tz";
import { MdDelete } from "react-icons/md";

const mapState = ({ messages, user }) => ({
	messages: messages.userChatMessages,
	currentUser: user.currentUser,
});

const MessagesContainer = ({ ...props }) => {
	const { messages, currentUser } = useSelector(mapState);
	const dispatch = useDispatch();

	const router = useRouter();
	const chatId = router.query.chatId;

	const userName = currentUser && currentUser.userName;

	const [message, setMessage] = useState("");

	const sortedmessages =
		Array.isArray(messages) &&
		messages.length > 0 &&
		lodash.orderBy(messages, "timestamp", "asc");

	useEffect(() => {
		// updateMessages();
		if (currentUser.userName) {
			fetchMessages();
		}
	}, [chatId, currentUser.userName]);
	const fetchMessages = () => {
		dispatch(
			fetchUserChatMessagesStart({
				currentUser,
				receiverUserName: chatId,
			}),
		);
	};
	const handleSendMessage = (e) => {
		e.preventDefault();

		const sendMessageURL = API_URLS.CREATE_CONVERSATIONS;
		// "http://147.182.225.167/api/conversation/create";

		const data = {
			msg_sender: userName,
			msg_receiver: chatId,
			message: message,
			conversation_subject: "",
		};
		// fetch(sendMessageURL, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Jwt ${currentUser.token}`,
		// 	},
		// 	body: JSON.stringify(data),
		// })

		authFetch(sendMessageURL, data, currentUser.token)
			// .then((res) => res.json())
			.then((json) => {
				fetchMessages();
				setMessage("");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Box
			sx={{
				padding: "16px",
			}}
		>
			{!chatId ? (
				<Typography>Select a chat to see message</Typography>
			) : (
				<Box
					sx={{
						overflow: "scroll",
						maxHeight: "90vh",
						maxWidth: "100%",

						"&::-webkit-scrollbar": {
							display: "none",
							// width:'4px'
						},
					}}
				>
					<Box sx={{ paddingBottom: "64px" }}>
						{Array.isArray(sortedmessages) &&
						sortedmessages.length > 0 ? (
							sortedmessages.map((item) => {
								return (
									<MessageBox
										key={item.conversation_id}
										item={item}
										fetchMessages={fetchMessages}
										currentUser={currentUser}
									/>
								);
							})
						) : (
							<Typography>Start conversation</Typography>
						)}
					</Box>
					<form onSubmit={(e) => handleSendMessage(e)}>
						<Box
							sx={{
								position: "fixed",
								bottom: "10px",
								maxWidth: "100%",
								width: "100%",
								alignItems: "center",
							}}
						>
							<OutlinedInput
								placeholder="Enter message"
								sx={{
									width: "70vw",
									background: "white",
									height: "36px",
								}}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
							<PrimaryButton
								sx={{
									marginLeft: "8px",
									height: "36px",
									marginTop: "-1px",
								}}
								disabled={message.length <= 0}
								type="submit"
							>
								Send
							</PrimaryButton>
						</Box>
					</form>
				</Box>
			)}
		</Box>
	);
};

const MessageBox = ({ item, fetchMessages, currentUser }) => {
	const {
		msg_receiver_data,
		msg_sender_data,
		conversation_id,
		timestamp,
		message,
	} = item;

	const getTimeBasedOnTimezone = (date, timezone) => {
		const dateWithTimezone = `${date}Z`;
		const parsedDate = toDate(dateWithTimezone);
		const action_date = date;
		// console.log({ date, parsedDate });
		const fromTime = action_date && utcToZonedTime(parsedDate, timezone);
		return fromTime;
	};
	const formattedDate = getTimeBasedOnTimezone(
		timestamp,
		Intl.DateTimeFormat().resolvedOptions().timeZone,
	);

	const formattedTime = format(formattedDate, "dd/MM/yyyy hh:mma");
	const timeDifferenceFromCurrentTime = formatDistance(
		formattedDate,
		new Date(),
		{
			addSuffix: true,
		},
	);

	const handleDeleteMessage = (e, conversation_id) => {
		let url = `${API_URLS.DELETE_CONVERSATION}/${conversation_id}?username=${currentUser.userName}`;
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Jwt ${currentUser.token}`,
			},
			// body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((json) => {
				console.log("Deleted Successfuly!");
				fetchMessages();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "start",
				flex: 1,

				maxWidth: "90%",
				paddingLeft: "16px",
				paddingTop: "4px",
				paddingBottom: "4px",
				paddingRight: "16px",
				"& > .delete-button": {
					display: "none",
					justifySelf: "flex-end",
					alignSelf: "center",
				},

				"&:hover": {
					background: "rgba(0,0,0,0.05)",
					"& > .delete-button": {
						display: "block",
					},
				},
			}}
		>
			<Avatar sx={{ marginRight: "8px" }} />
			<Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
				<Stack direction={"row"}>
					<Typography
						sx={{
							paddingRight: "8px",
							fontSize: "14px",
							fontWeight: 700,
						}}
					>
						{msg_sender_data.username}
					</Typography>
					<Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
						{timeDifferenceFromCurrentTime}
					</Typography>
				</Stack>
				<Typography>{message}</Typography>
			</Box>
			{currentUser.userName === msg_sender_data.username && (
				<IconButton
					className="delete-button"
					onClick={(e) => handleDeleteMessage(e, conversation_id)}
				>
					<MdDelete />
				</IconButton>
			)}
		</Box>
	);
};
export default MessagesContainer;
