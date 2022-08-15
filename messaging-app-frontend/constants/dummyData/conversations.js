const conversationResponse = {
	count: 10,
	next: "http://127.0.0.1:8000/api/conversations/?archived=False&page=2&username=test1",
	previous: null,
	results: [
		{
			id: 20,
			msg_sender: {
				username: "test1",
				email: "test1@gmail.com",
				first_name: "",
				last_name: "",
			},
			msg_receiver: {
				username: "test",
				email: "test@gmail.com",
				first_name: "",
				last_name: "",
			},
			message: "sdvsdvdsfv",
			image: null,
			conversation_id: "1660199740430",
			conversation_subject: "testkk",
			publish: "2022-08-11",
			timestamp: "Thursday August 11, 2022   07:11AM UTC",
			archive_url:
				"http://127.0.0.1:8000/api/conversation/archived/1660199740430/",
			delete_url:
				"http://127.0.0.1:8000/api/conversation/delete/1660199740430/",
		},
		{
			id: 18,
			msg_sender: {
				username: "test",
				email: "test@gmail.com",
				first_name: "",
				last_name: "",
			},
			msg_receiver: {
				username: "test1",
				email: "test1@gmail.com",
				first_name: "",
				last_name: "",
			},
			message: "hiierer",
			image: null,
			conversation_id: "1660200853008",
			conversation_subject: "testkk",
			publish: "2022-08-11",
			timestamp: "Thursday August 11, 2022   06:54AM UTC",
			archive_url:
				"http://127.0.0.1:8000/api/conversation/archived/1660200853008/",
			delete_url:
				"http://127.0.0.1:8000/api/conversation/delete/1660200853008/",
		},
		{
			id: 16,
			msg_sender: {
				username: "test",
				email: "test@gmail.com",
				first_name: "",
				last_name: "",
			},
			msg_receiver: {
				username: "test1",
				email: "test1@gmail.com",
				first_name: "",
				last_name: "",
			},
			message: "hiierer",
			image: null,
			conversation_id: "1660199736294",
			conversation_subject: "testkk",
			publish: "2022-08-11",
			timestamp: "Thursday August 11, 2022   06:35AM UTC",
			archive_url:
				"http://127.0.0.1:8000/api/conversation/archived/1660199736294/",
			delete_url:
				"http://127.0.0.1:8000/api/conversation/delete/1660199736294/",
		},
	],
};

export default conversationResponse;
