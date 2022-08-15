import React from "react";
import { useRouter } from "next/router";
import ChatLayout from "layouts/ChatLayout";
import MessagesContainer from "components/MessagesContainer";
import Seo from "components/Seo";

const ChatsDetailPage = () => {
	const router = useRouter();
	const chatId = router.query.chatId;

	return (
		<ChatLayout>
				<Seo title={'Message'} />
		
			<MessagesContainer chatId={chatId} />
		</ChatLayout>
	);
};

export default ChatsDetailPage;
