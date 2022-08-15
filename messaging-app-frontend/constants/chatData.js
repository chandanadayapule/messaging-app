import userData from "./userData";

const { default: messages } = require("./messages");

const getMessages = (data, userId) => {
	const messages = data.filter((item) => {
		const { sender } = item;
		if (sender?.userId == userId) return item;
		return null;
	});
	return messages;
};
const chatData = [
	{
		user: userData[0],
		userId: 1,
		userName: "Mohit",
		messages: [
			{
				sender: userData[0],
				receiver: userData[0],
				message: "Hi ",
				time: "02/08/2022",
				senderId: 0,
				objectId: 1,
				isNotRead: false,
			},
			{
				sender: userData[0],
				receiver: userData[0],
				message: "hello",
				time: "02/08/2022",
				senderId: 0,
				objectId: 2,
				isNotRead: false,
			},
			{
				sender: userData[0],
				receiver: userData[0],
				message: "How are you",
				time: "02/08/2022",
				senderId: 0,
				objectId: 3,
				isNotRead: false,
			},
		],
	},
	{
		userId: 2,
		userName: "Anoop",

		user: userData[1],
		messages: [
			{
				sender: userData[0],
				receiver: userData[1],
				message: "Hi !",
				time: "02/08/2022",
				senderId: 0,
				objectId: 4,
				isNotRead: false,
			},
			{
				sender: userData[1],
				receiver: userData[0],
				message: "Hello😂!",
				time: "02/08/2022",
				senderId: 0,
				objectId: 5,
				isNotRead: false,
			},
			{
				sender: userData[1],
				receiver: userData[0],
				message: "How are you",
				time: "02/08/2022",
				senderId: 0,
				objectId: 6,
				isNotRead: false,
			},
			{
				sender: userData[0],
				receiver: userData[1],
				message: "Doing good😎😎",
				time: "02/08/2022",
				senderId: 0,
				objectId: 19,
				isNotRead: false,
			},
			{
				sender: userData[0],
				receiver: userData[1],
				message: "You say",
				time: "02/08/2022",
				senderId: 0,
				objectId: 20,
				isNotRead: false,
			},
			{
				sender: userData[1],
				receiver: userData[0],
				message: "I'm also good!",
				time: "02/08/2022",
				senderId: 0,
				objectId: 21,
				isNotRead: true,
			},
		],
	},
	{
		userId: 3,
		userName: "Harish",

		user: userData[2],
		messages: [
			{
				sender: userData[2],
				receiver: userData[0],
				message: "Hey!",
				time: "02/08/2022",
				senderId: 0,
				objectId: 7,
				isNotRead: false,
			},
			{
				sender: userData[2],
				receiver: userData[0],
				message: "Good morning! ",
				time: "02/08/2022",
				senderId: 0,
				objectId: 8,
				isNotRead: false,
			},
			{
				sender: userData[0],
				receiver: userData[2],
				message: "Good morning!",
				time: "02/08/2022",
				senderId: 0,
				objectId: 9,
				isNotRead: false,
			},
			{
				sender: userData[2],
				receiver: userData[0],
				message: "How are you?",
				time: "02/08/2022",
				senderId: 0,
				objectId: 20,
				isNotRead: true,
			},
		],
	},
	{
		userId: 4,
		userName: "Sudhin",

		user: userData[3],
		messages: [
			{
				sender: userData[3],
				receiver: userData[0],
				message: "Hi !",
				time: "02/08/2022",
				senderId: 0,
				objectId: 10,
				isNotRead: false,
			},
			{
				sender: userData[0],
				receiver: userData[3],
				message: `Hi ${userData[3].userName}!`,
				time: "02/08/2022",
				senderId: 0,
				objectId: 11,
				isNotRead: false,
			},
			{
				sender: userData[3],
				receiver: userData[0],
				message: "What's up?",
				time: "02/08/2022",
				senderId: 0,
				objectId: 12,
				isNotRead: true,
			},
		],
	},
	{
		userId: 5,
		userName: "Poorna",

		user: userData[4],
		messages: [
			{
				sender: userData[4],
				receiver: userData[0],
				message: "Hi!",
				time: "02/08/2022",
				senderId: 0,
				objectId: 13,
				isNotRead: false,
			},
			{
				sender: userData[0],
				receiver: userData[4],
				message: "Hi!",
				time: "02/08/2022",
				senderId: 0,
				objectId: 14,
				isNotRead: false,
			},
		],
	},
	{
		userId: 6,
		userName: "Prashant",

		user: userData[5],
		messages: [
			{
				sender: userData[5],
				receiver: userData[0],
				message: "Hi ",
				time: "02/08/2022",
				senderId: 0,
				objectId: 16,
				isNotRead: false,
			},
			{
				sender: userData[0],
				receiver: userData[5],
				message: "Hello!",
				time: "02/08/2022",
				senderId: 0,
				objectId: 17,
				isNotRead: false,
			},
			{
				sender: userData[5],
				receiver: userData[0],
				message: "How are you?",
				time: "02/08/2022",
				senderId: 0,
				objectId: 18,
				isNotRead: true,
			},
		],
	},
];

export default chatData;
