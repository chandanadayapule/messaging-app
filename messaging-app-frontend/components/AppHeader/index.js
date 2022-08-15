import { AppBar, Toolbar, MenuItem } from "@mui/material";
import AppLink from "components/Common/AppLink";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import ProfileMenu from "./ProfileMenu";
import { useDispatch } from "react-redux";
import { signOutUser } from "store/user/userSlice";
import { useRouter } from "next/router";

const AppHeader = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleSignOut = () => {
		router.push("/login");
		dispatch(signOutUser({}));
	};

	return (
		<div>
			<AppBar position="static">
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					{/* <MenuItem LinkComponent={<AppLink />} href="/" to="/">
						Home
					</MenuItem> */}
					<AppLink href="/">Home</AppLink>
					{/* <MenuItem onClick={handleSignOut}>Sign out</MenuItem> */}
					<ProfileMenu />
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default AppHeader;
