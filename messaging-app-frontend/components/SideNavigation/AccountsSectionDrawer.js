import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, MenuItem } from "@mui/material";
import AppLink from "components/Common/AppLink";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "visible",
	borderRight: "none",

	background: "#F7f7f7",
	// boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(6)} + 1px)`,
	borderRight: "none",
	// boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
	overflow: "visible",
	paddingLeft: "8px",
	paddingRight: "8px",
	// paddingLeft: "8px",
	// marginLeft: "-24px",

	background: "#F7f7f7",

	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
		overflow: "visible",
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	borderRight: "none",
	// overflow: "visible",
	boxSizing: "border-box",
	position: "relative",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),

		// overflow: "visible",
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),

		// overflow: "visible",
	}),
}));

const StyledMenuItem = styled(MenuItem, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({}));

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
	// drawerOpen: view.ua_drawer_open,
});

export default function AccountSectionDrawer({ children, paddingLeft }) {
	// const classes = useStyles();
	const theme = useTheme();
	const { currentUser } = useSelector(mapState);
	const [open, setOpen] = React.useState(true);
	const dispatch = useDispatch();
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const handleDrawerState = () => {
		setOpen(!open);
		// dispatch(setUserAccountDrawerOpen(!open));
	};

	const handleDialogOpen = () => {
		dispatch(signOutUserStart());
	};

	const links = [
		{
			title: "Home",
			url: "/",
			//   icon: HomeIcon,
			exact: true,
			show: true,
		},
		{
			title: "My Account",

			url: "/dashboard",
			//   icon: NotificationIcon,
			show: true,
		},
		{
			title: "My Admin",
			url: "/admin",
			exact: true,

			//   icon: BookmarkIcon,
			// show: checkUserIsAdmin(currentUser),
		},

		{
			title: "Add New Product",
			url: "/admin/create-new-product",
			exact: true,
			//   icon: BookmarkIcon,
			// show: checkUserIsAdmin(currentUser),
		},
	];
	const filteredLinks = links
		.map((item, index) => {
			const { title, icon, show, url, exact, hasDivider } = item;

			return {
				title,
				icon,
				show,
				url,
				exact,
				hasDivider,
			};
		})
		.filter((item, index) => {
			const { title, icon, show, url, exact, hasDivider } = item && item;
			if (show)
				return {
					title,
					icon,
					show,
					url,
					exact,
					hasDivider,
				};
			return null;
		});
	// console.log({ filteredLinks });

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Box
		>
			<CssBaseline />

			<Drawer
				variant="permanent"
				open={open}
				style={{ position: "relative" }}
				// className={classes.drawer}
			>
				<Toolbar />
		
				<List style={{}}>
					{filteredLinks?.map((item, index) => {
						const {
							url,
							title,
							icon: Icon,
							exact,
							hasDivider,
							show,
						} = item;

						return (
							<>
								<Tooltip
									title={title}
									placement="right"
									// style={{ display: open ? "none" : "" }}
									arrow
								>
									<MenuItem
										component={AppLink}
										// activeClassName={classes.activeLink}
										// className={classes.menuItem}
										href={url && url}
										exact={exact && exact}
										key={item.title}
										style={
											open
												? {
														margin: "8px",
												  }
												: { margin: "0px" }
										}
										// className={classes.link}
									>
										<ListItemIcon
											style={
												open
													? {}
													: { marginLeft: "-12px" }
											}
											// className={classes.listItemIcon}
										>
											{Icon && (
												<Icon
												// className={classes.icon}
												/>
											)}
										</ListItemIcon>
										{open && (
											<ListItemText
												primary={item.title}
												primaryTypographyProps={{
													// color: "black",
													fontWeight: 600,
													// marginLeft: "8px",
												}}
											/>
										)}
									</MenuItem>
								</Tooltip>
								{hasDivider && <Divider />}
							</>
						);
					})}
					<Tooltip title="Logout" placement="right" arrow>
						<MenuItem
							style={open ? { margin: "8px" } : { margin: "0px" }}
							// className={classes.menuItem}
							onClick={handleDialogOpen}
						>
							<ListItemIcon
								style={open ? {} : { marginLeft: "-12px" }}
								// className={classes.listItemIcon}
							>
								{/* <LogoutIcon className={classes.icon} /> */}
							</ListItemIcon>
							{open && (
								<ListItemText
									primaryTypographyProps={{
										fontWeight: 600,
										// marginLeft: "8px",
									}}
									primary="Logout"
								/>
							)}
						</MenuItem>
					</Tooltip>
				</List>
			</Drawer>
			<Box
				component="main"
				style={{ paddingLeft: paddingLeft }}
				sx={{
					pr: 3,
					pb: 4,
				}}
				// className={classes.mainContent}
			>
				{children}
			</Box>

		</Box>
	);
}
