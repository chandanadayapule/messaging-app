import React from "react";
import {
	Avatar,
	Fade,
	MenuItem,
	Paper,
	Popover,
	Popper,
	Typography,
} from "@mui/material";
import {
	usePopupState,
	bindToggle,
	bindTrigger,
	bindPopover,
} from "material-ui-popup-state/hooks";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signOutUser } from "store/user/userSlice";

const ProfileMenu = () => {
	const popupState = usePopupState({
		variant: "popper",
		popupId: "demoPopper",
	});
	const dispatch = useDispatch();
	const router = useRouter();

	const handleSignOut = () => {
		router.push("/login");
		dispatch(signOutUser({}));
	};

	return (
		<div>
			<Avatar
				sx={{ height: "40px", width: "40px", cursor: "pointer" }}
				{...bindTrigger(popupState)}
			/>
			<Popover
				{...bindPopover(popupState)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				PaperProps={{
					sx: {
						padding: "16px",
						marginRight: "8px",
						marginTop: "16px",
						fontWeight: "600",
					},
				}}
			>
				<MenuItem>Profile</MenuItem>
				<MenuItem onClick={() => handleSignOut()}>Log out</MenuItem>
			</Popover>{" "}
		</div>
	);
};

export default ProfileMenu;
