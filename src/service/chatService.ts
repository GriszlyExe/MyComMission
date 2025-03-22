import axios from "axios";
import { serverAddr } from ".";

export const getChatrooms = async (userId: string) => {
	try {
		const options = {
			method: "GET",
			url: `${serverAddr}/chat/chatroom/${userId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const {
			data: { chatrooms },
		} = await axios.request(options);

		return chatrooms.map((chatRoom: any) => {
			return {
				chatRoomId: chatRoom.chatRoomId,
				createdAt: chatRoom.createdAt,
				user2:
					chatRoom.users[0].userId === userId
						? chatRoom.users[1]
						: chatRoom.users[0],
				latestCommission: chatRoom.latestCommission,
			};
		});
	} catch (error) {
		throw error;
	}
};

export const getChatroom = async (chatroomId: string) => {
	try {
		const options = {
			method: "GET",
			url: `${serverAddr}/chat/chatroom/get/${chatroomId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const res = await axios.request(options);
		return res.data.chatroom;
	} catch (error) {
		throw error;
	}
};

export const getMessageChatroom = async (chatroomId: string) => {
	try {
		const options = {
			method: "GET",
			url: `${serverAddr}/chat/message-chatroom/${chatroomId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const res = await axios.request(options);
		return res.data.chatroom;
	} catch (error) {
		throw error;
	}
};

export const createMessage = async ({
	chatRoomId,
	senderId,
	content,
	messageType,
}: {
	chatRoomId: string;
	senderId: string;
	content: string;
	messageType: "MESSAGE" | "BRIEF" | "PROPOSAL" | "IMAGE";
}) => {
	try {
		const body = {
			chatRoomId,
			senderId,
			content,
			messageType,
		};
		
		const options = {
			method: "POST",
			url: `${serverAddr}/chat/message`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: body,
		};

		const { data } = await axios.request(options);

		return data;
	} catch (error) {
		throw error;
	}
};

export const createChatroom = async ({
	creatorId,
	memberId,
}: {
	creatorId: string;
	memberId: string;
}) => {
	console.log({ creatorId, memberId });
	try {
		const json = {
			creatorId,
			memberId,
		};

		const options = {
			method: "POST",
			url: `${serverAddr}/chat/chatroom`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: json,
		};

		const res = await axios.request(options);
		console.log("Chat Room Created: ", res);
		return res.data;
	} catch (error) {
		throw error;
	}
};
