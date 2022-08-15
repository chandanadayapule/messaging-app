import { Dialog, Paper, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import API_URLS from "constants/API_URLS";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const CreateNewMessageDialog = ({ open, handleClose }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { currentUser } = useSelector(mapState);

	const [userName, setUserName] = useState("");
	const [accounts, setAccounts] = useState([]);
	useEffect(() => {
		if (currentUser.token) {
			fetchAccounts();
		}
	}, [currentUser.token]);
	const fetchAccounts = () => {
		const url = API_URLS.GET_ACCOUNTS;
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Jwt ${currentUser.token}`,
			},
		})
			.then((res) => res.json())
			.then((json) => setAccounts(json))
			.catch((error) => console.log(error));
	};
	const createNewUserAndSendMessage = async () => {
		// let userId = uuidv4();
		// await dispatch(
		// 	addNewReceiver({
		// 		userId,
		// 		userName: userName?.value && userName?.value,
		// 		userImage: "",
		// 	}),
		// );
		// let newChatData = {
		// 	user: {
		// 		userId,
		// 		userName: userName?.value && userName?.value,
		// 		userImage: "",
		// 	},
		// 	userId,
		// 	userName: userName?.value && userName?.value,
		// 	messages: [],
		// };
		// await dispatch(setChatData());

		router.push(`/chats/${userName.value && userName.value}`);
		handleClose();
	};
	const handleChange = (event) => {
		// console.log("event in input", event);
		setUserName(event);
	};

	const options = accounts
		.map((item) => {
			const { email, first_name, id, last_name, username } = item;
			return {
				label: username,
				value: username,
			};
		})
		.sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

	return (
		<Dialog open={open} onClose={handleClose}>
			<Paper
				elevation={0}
				sx={{
					padding: "16px",
					paddingBottom: "32px",
					minHeight: "300px",
				}}
			>
				<Typography variant="h4" marginTop="16px">
					Compose new message
				</Typography>

				<FormSelectInput
					title={`Select Username to chat`}
					options={options}
					value={userName}
					onChange={handleChange}
					placeholder="Select username"
				/>
				{/* <OutlinedInput
					placeholder="enter username"
					fullWidth
					value={userName.value && userName?.value}
					sx={{ height: "36px" }}
					onChange={(e) => setUserName(e.target.value)}
				/> */}
				<PrimaryButton
					fullWidth
					sx={{
						marginTop: "16px",
						marginBottom: "16px",
						height: "36px",
					}}
					onClick={() => createNewUserAndSendMessage()}
				>
					Send
				</PrimaryButton>
			</Paper>
		</Dialog>
	);
};

export default CreateNewMessageDialog;
