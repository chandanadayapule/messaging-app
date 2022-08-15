import { Box } from "@mui/system";
import AppHeader from "components/AppHeader";
import SideNavigation from "components/SideNavigation/index";
import API_URLS from "constants/API_URLS";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signOutUser } from "store/user/userSlice";
import authFetch from "utils/authFetch";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const ChatLayout = ({ title, children, ...props }) => {
	const { currentUser } = useSelector(mapState);
	const router = useRouter();
	const dispatch = useDispatch();

	const token = currentUser?.token && currentUser?.token;
	useEffect(() => {
		if (currentUser.userName) {
			verifyToken();
		}
		checkUser();
	}, [currentUser.userName]);
	const checkUser = () => {
		if (
			!currentUser ||
			currentUser === undefined ||
			currentUser === {} ||
			!currentUser.userName ||
			!token
		) {
			return router.push("/login");
		} else {
			return;
		}
	};

	const verifyToken = () => {
		const url = API_URLS.VERIFY_TOKEN;
		authFetch(url, { token })
			.then((json) => {
				dispatch(
					signInUser({
						userName: currentUser.userName,
						token: json.token,
					}),
				);
			})
			.catch((err) => {
				dispatch(signOutUser({}));
				console.error(err);
			});
	};

	return (
		<Box sx={{ maxHeight: "100vh", overflow: "hidden" }}>
			<AppHeader />
			<SideNavigation>{children}</SideNavigation>
		</Box>
	);
};

export default ChatLayout;
