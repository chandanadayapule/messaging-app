import { Container } from "@mui/system";
import React, { useState } from "react";
import { OutlinedInput, Stack, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { signInUser } from "store/user/userSlice";
import { useRouter } from "next/router";
import Seo from "components/Seo";
import API_URLS from "constants/API_URLS";
import authFetch from "utils/authFetch";

const LoginPage = () => {
	const router = useRouter();
	// let auth = useAuth();
	const dispatch = useDispatch();

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({});

	const handleLogin =  (e) => {
		e.preventDefault();
		const url = API_URLS.GET_TOKEN;

		authFetch(url, { username: userName, password })
			.then((json) => {
				dispatch(signInUser({ userName, token: json.token }));

				router.push("/");
			})
			.catch((err) => {
				console.error({ err });
				setError({ error: err.message });
			});
	};
	console.log({ error });
	return (
		<div
			style={{
				display: "grid",
				placeItems: "center",
				height: "100vh",
			}}
		>
			<Seo title={"Login to Chat App"} />
			<form onSubmit={(e) => handleLogin(e)}>
				<Stack direction={"column"} spacing={2}>
					<Typography variant="h4">
						Enter Username and password
					</Typography>

					<OutlinedInput
						placeholder="Username"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
					<OutlinedInput
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<PrimaryButton
						type="submit"
						disabled={userName.length <= 3 || password.length <= 3}
					>
						Log in
					</PrimaryButton>

					{Object.keys(error).length > 0 && (
						<div>
							{Object.values(error).map((item) => {
								return <p key={item}>{item}</p>;
							})}
						</div>
					)}
				</Stack>
			</form>
		</div>
	);
};

export default LoginPage;
