import AppHeader from "components/AppHeader";
import MessagesContainer from "components/MessagesContainer";
import Seo from "components/Seo";
import ChatLayout from "layouts/ChatLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export default function Home() {
	const { currentUser } = useSelector(mapState);
	const router = useRouter();

	// useEffect(() => {
	// 	checkUserLogin();
	// }, [currentUser]);
	// const checkUserLogin = () => {
	// 	if (currentUser === {} || !currentUser.userName)
	// 		return router.push("/login");
	// };

	return (
		<ChatLayout>
			<Seo title={"Select Chats"} />
			{currentUser !== {} && <MessagesContainer />}{" "}
		</ChatLayout>
	);
}
