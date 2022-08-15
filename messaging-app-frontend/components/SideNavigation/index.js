import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Avatar, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import CreateNewMessageDialog from "components/Common/Dialogs/CreateNewMessageDialog";
import lastConversationsResponse from "constants/dummyData/lastConversations";
import API_URLS from "constants/API_URLS";
import authFetch from "utils/authFetch";
import {
	addChatData,
	fetchLastConversationsStart,
	setChatData,
} from "store/messages/messageSlice";
import { fetchLastConversations } from "store/messages/messages.saga";
import lodash from "lodash";
const mapState = ({ messages, user }) => ({
	chatData: messages.lastConversations,
	currentUser: user.currentUser,
});
const SideNavigation = ({ children }) => {
	const { chatData, currentUser } = useSelector(mapState);
	const router = useRouter();
	const chatId = router.query.chatId;
	const dispatch = useDispatch();
	const [openDialog, setOpenDialog] = useState(false);
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleClick = (e, userId) => {
		console.log(userId);
		router.push(`/chats/${userId}`);
	};

	useEffect(() => {
		if (currentUser.userName) {
			getConversationsList();
		}
	}, [currentUser.userName]);

	const getConversationsList = () => {
		dispatch(
			fetchLastConversationsStart({
				currentUser,
			}),
		);
	};

	const newData = lodash.uniqBy(chatData, "username");

	return (
		<Box sx={{ display: "flex", justifyContent: "start", flex: 1 }}>
			<Stack
				sx={{
					flex: 0.2,
					flexDirection: "column",
					// padding: "16px",
					borderRight: "1px solid rgba(0,0,0,0.3)",
					height: "100vh",
					overflow: "scroll",
				}}
			>
				<Button
					sx={{
						textTransform: "capitalize",
						"&:hover": {
							background: "rgba(0,0,0,0.05)",
						},
					}}
					onClick={() => setOpenDialog(true)}
				>
					Compose
				</Button>
				{Array.isArray(newData) &&
					newData.length > 0 &&
					newData.map((item) => {
						const { messages } = item;
						return (
							<NavItem
								key={item.userId}
								onClick={(e) => handleClick(e, item.username)}
								title={item.username}
								active={chatId === item.username}
								currentUser={currentUser}
								sender={item.msg_sender}
								imageurl={""}
								message={item.last_message}
								isNotRead={item.read}
							/>
						);
					})}
			</Stack>
			<Stack width={`100%`} sx={{ flex: 0.8 }}>
				{children}
			</Stack>
			<CreateNewMessageDialog
				open={openDialog}
				handleClose={handleCloseDialog}
			/>
		</Box>
	);
};
const NavItem = ({
	imageurl,
	title,
	onClick,
	active,
	message,
	isNotRead,
	sender,
	currentUser,
}) => {
	// console.log({ messageInSIdeNav: message });

	return (
		<Box
			onClick={onClick}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				paddingLeft: "8px",
				paddingRight: "8px",
				paddingTop: "8px",
				paddingBottom: "8px",
				cursor: "pointer",
				background: active && "rgba(0,0,0,0.05)",
				"&:hover": {
					background: "rgba(0,0,0,0.05)",
				},
			}}
		>
			<Avatar
				src={imageurl}
				sx={{ height: "36px", width: "36px", marginRight: "12px" }}
			/>
			<div style={{ width: "100%" }}>
				<Typography
					sx={{
						fontSize: "14px",
						fontWeight: "700",
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					{title}{" "}
					{isNotRead && (
						<span
							style={{
								fontSize: "12px",
								justifySelf: "end",
								textAlign: "right",
							}}
						>
							New
						</span>
					)}
				</Typography>

				<Typography
					sx={{
						fontSize: "14px",
						fontWeight: isNotRead ? "700" : "500",
					}}
				>
					{sender === currentUser.userName && " You:"} {message}
				</Typography>
			</div>
		</Box>
	);
};

export default SideNavigation;
