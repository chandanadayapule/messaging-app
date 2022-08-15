import React from "react";
import { Button } from "@mui/material";
const PrimaryButton = ({ children, sx, ...props }) => {
	return (
		<Button
			variant="contained"
			sx={{
				textTransform: "initial",
				...sx,
			}}
			disableElevation
			{...props}
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
