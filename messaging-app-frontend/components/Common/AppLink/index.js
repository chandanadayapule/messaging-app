import React from "react";
import Link from "next/link";
import { styled } from "@mui/material";

const StyledLink = styled("a")(({ theme, ...props }) => ({
	...props,
}));
const AppLink = ({ href, sx, ...props }) => {
	return (
		<Link href={href} {...props}>
			<StyledLink sx={{ cursor: "pointer", ...sx }}>
				{props.children}
			</StyledLink>
		</Link>
	);
};

export default AppLink;
