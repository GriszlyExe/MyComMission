"use client";

import { Message } from "@/common/model";
import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import { io } from "socket.io-client";
import { getMessageChatroom } from "@/service/chatService";
import SendArtworkInChat from "./SendArtworkInChat";
import BriefInChat from "./BriefInChat";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import {
	addMessage,
	setMessages,
	setReceiver,
} from "@/states/features/chatSlice";
import { getUserInfo } from "@/service/userService";

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

	useEffect(() => {
		// Fetch messages from backend
		const fetchMessageChatroom = async () => {
			if (activeRoomId !== undefined) {
				const { messages } = await getMessageChatroom(activeRoomId);
				const user = await getUserInfo(receiverId!);
				// console.log(user);
				dispatch(setReceiver(user));
				dispatch(setMessages(messages));
			}
		};

		fetchMessageChatroom();
	}, [activeRoomId]);

	useEffect(() => {
		socket.on("receiveMessage", ({ newMessage }) => {
			const { chatRoomId } = newMessage;
			if (chatRoomId === activeRoomId) {
				dispatch(addMessage(newMessage));
			}
		});

		socket.emit("joinRoom", {
			senderId: loggedInUserId,
			chatRoomId: activeRoomId,
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
					{receiver !== null &&
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
