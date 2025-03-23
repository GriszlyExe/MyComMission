"use client";

import { Commission, Message } from "@/common/model";
import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import { io } from "socket.io-client";
import { getMessageChatroom } from "@/service/chatService";
import SendArtworkInChat from "./SendArtworkInChat";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import {
	addMessage,
	setMessages,
	setReceiver,
	updateRoomState,
} from "@/stores/features/chatSlice";
import { getUserInfo } from "@/service/userService";
import { setLatestCommission } from "@/stores/features/commisionSlice";

const socket = io(process.env.SERVER_ADDRESS);

const ChatWindow = () => {

	const containerRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const loggedInUserId = useAppSelector((state) => state.user.user!.userId);
	const activeRoomId = useAppSelector(
		(state) => state.chat.activeRoom?.chatRoomId,
	);
	const receiverId = useAppSelector((state) => {
		if (state.chat.activeRoom?.user2) {
			return state.chat.activeRoom.user2.userId;
		}
		return null;
	});

	const messages = useAppSelector((state) => state.chat.messages);
	const receiver = useAppSelector((state) => state.chat.activeReceiver);
	const currentCommission = useAppSelector(state => state.chat.chatRooms.find(room => room.chatRoomId === activeRoomId)?.latestCommission);

	useEffect(() => {
		// Fetch messages from backend
		const fetchMessageChatroom = async () => {
			if (activeRoomId !== undefined) {
				const res = await getMessageChatroom(activeRoomId);
				console.log(res);
				const { messages, latestCommission } = res;
				const user = await getUserInfo(receiverId!);
				console.log(messages);
				dispatch(setLatestCommission(latestCommission));
				dispatch(setReceiver(user));
				dispatch(setMessages(messages));
			}
		};

		fetchMessageChatroom();
	}, [activeRoomId]);

	useEffect(() => {
		
		socket.emit("joinRoom", {
			senderId: loggedInUserId,
			chatRoomId: activeRoomId,
		});

		socket.on("receiveMessage", ({ newMessage }) => {
			const { chatRoomId, commission } = newMessage;
			console.log(newMessage);
			if (chatRoomId === activeRoomId) {
				dispatch(addMessage(newMessage));
				dispatch(updateRoomState({ chatRoomId, message: newMessage, commission: commission ? commission : currentCommission}))
			}
		});


		return () => {
			socket.off("receiveMessage");
		};
	}, [loggedInUserId, activeRoomId]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div>
			<div className="h-[500px] max-h-[500px] p-1">
				<div
					ref={containerRef}
					className="mt-1 max-h-[460px] overflow-y-auto overflow-x-hidden scrollbar-hidden"
				>
					{receiver !== null && messages &&
						messages.map((message) => (
							<MessageItem
								messageItem={message}
								key={message.messageId}
							/>
						))}
				</div>
			</div>
			{activeRoomId && <MessageInput />}
		</div>
	);
};

export default ChatWindow;
