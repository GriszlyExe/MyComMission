"use client";

import { Commission, Message } from "@/common/model";
import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import { io } from "socket.io-client";
import { getMessageChatroom } from "@/service/chatService";
import SendArtworkInChat from "./ArtworkInChat";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import {
	addMessage,
	setActiveRoomCommission,
	setMessages,
	setReceiver,
	updateRoomState,
} from "@/stores/features/chatSlice";
import { getUserInfo } from "@/service/userService";
import { setLatestCommission } from "@/stores/features/commisionSlice";
import { states } from "./commissionState";
import { useMediaQuery } from "react-responsive";

const socket = io(process.env.SERVER_ADDRESS);

const ChatWindow = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const isMobile = useMediaQuery({ maxWidth: 768 });
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
	const currentCommission = useAppSelector(
		(state) =>
			state.chat.chatRooms.find(
				(room) => room.chatRoomId === activeRoomId,
			)?.latestCommission,
	);

	useEffect(() => {
		// Fetch messages from backend
		const fetchMessageChatroom = async () => {
			if (activeRoomId !== undefined) {
				const res = await getMessageChatroom(activeRoomId);
				console.log(res);
				const { messages, latestCommission } = res;
				// console.log(messages);
				const user = await getUserInfo(receiverId!);

				dispatch(setReceiver(user));
				dispatch(setMessages(messages));
				if (latestCommission) {
					dispatch(setActiveRoomCommission(latestCommission));
				}
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
			const { commission, ...rest } = newMessage;
			console.log(newMessage);
			if (rest.chatRoomId === activeRoomId) {
				// dispatch(setLatestCommission(commission ? commission : currentCommission));
				if (commission && commission.state === states.brief) {
					dispatch(setActiveRoomCommission(commission));
				}
				dispatch(addMessage(newMessage));
				dispatch(
					updateRoomState({
						chatRoomId: rest.chatRoomId,
						message: rest,
						commission: commission ? commission : currentCommission,
					}),
				);
			}
		});

		return () => {
			socket.off("receiveMessage");
		};
	}, [loggedInUserId, activeRoomId]);

	useEffect(() => {
		if (containerRef.current) {
			// console.log(`Scrolling to ${containerRef.current.scrollHeight}`);
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<>
			<div className="h-full overflow-y-auto rounded-md bg-white scrollbar-hidden">
				<div className="flex flex-col md:h-full">
					<div
						ref={containerRef}
						className='flex flex-col-reverse overflow-y-auto overflow-x-hidden p-2 mt-1 h-full scrollbar-hidden'
					>
						{/* <MessageItem messageItem={{ ...messages[0], messageType: "IMAGE" }}/> */}
						{receiver !== null &&
							messages &&
							[...messages]
								.reverse()
								.map((message) => (
									<MessageItem
										messageItem={message}
										key={message.messageId}
									/>
								))}
					</div>
					{/* Input area - fixed on mobile */}
					{/* <div
						className={` ${
							isMobile
								? "fixed bottom-7 border-2 border-red-600 bg-white w-auto"
								: ""
						} `}
					>
						{activeRoomId && <MessageInput />}
					</div> */}
				</div>
			</div>
			{activeRoomId && <MessageInput />}
		</>
	);
};

export default ChatWindow;
