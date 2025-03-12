"use client"

import { Message } from "@/common/model";
import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import { io } from "socket.io-client"
import { getMessageChatroom } from "@/service/chatService";
import SendArtworkInChat from "./SendArtworkInChat";
import BriefInChat from "./BriefInChat";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { addMessage, setMessages, setReceiver } from "@/states/features/chatSlice";
import { getUserInfo } from "@/service/userService";
import { BriefForm } from "./BriefForm";

const socket = io(process.env.SERVER_ADDRESS);

const ChatWindow = () => {

	const containerRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const loggedInUserId = useAppSelector(state => state.user.user!.userId);
	const activeRoomId = useAppSelector(state => state.chat.activeRoom?.chatRoomId);
	const receiverId = useAppSelector(state => {
		if (state.chat.activeRoom?.user2) {
			return state.chat.activeRoom.user2.userId;
		}
		return null;
	});
	const messages = useAppSelector(state => state.chat.messages);
	const receiver = useAppSelector(state => state.chat.activeReceiver);

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
		}

		fetchMessageChatroom()

	}, [activeRoomId]);

	useEffect(() => {
		// Listen for incoming messages
		socket.on("receive-message", ({ newMessage }) => {
			// console.log(`Receiving Message: ${newMessage.content} with ${newMessage.senderId}`)
			console.log(`New message`);
			console.log(newMessage);
			console.log(`Active room ID: ${activeRoomId}`);
			if (newMessage.chatRoomId === activeRoomId) {
				dispatch(addMessage(newMessage));
			}
		});

		console.log(loggedInUserId, activeRoomId);
		socket.emit("join_room", { 
			senderId: loggedInUserId,
			chatRoomId: activeRoomId,
		 })

		return () => {
			socket.off("receive-message");
		};

	}, [loggedInUserId, activeRoomId])

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div>
			<div className="p-1 max-h-[500px] h-[500px]">
				<div ref={containerRef} className="max-h-[460px] overflow-y-auto overflow-x-hidden scrollbar-hidden mt-1">
					{receiver !== null && messages.map((message) => (
						<MessageItem messageItem={message} key={message.messageId} />
					))}
				</div>
			</div>
			{activeRoomId && <MessageInput />}
		</div>

	);
};

export default ChatWindow;
