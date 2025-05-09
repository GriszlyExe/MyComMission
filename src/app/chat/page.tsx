"use client";

import React, { useEffect, useState } from "react";
import TopNav from "@/app/ui/global/nav-bar";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import ChatRoomItem from "@/app/ui/chat/ChatRoomItem";
import ChatWindow from "../ui/chat/ChatWindow";
import { getChatrooms } from "@/service/chatService";
import { setChatRooms } from "@/stores/features/chatSlice";
import { formatDate } from "@/utils/helper";
import { useMediaQuery } from "react-responsive";
import { IoArrowBack } from "react-icons/io5";

const Page = () => {
	const [showChatWindowMobile, setShowChatWindowMobile] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 768 });

	const userId = useAppSelector((state) => state.user.user!.userId);
	const rooms = useAppSelector((state) => state.chat.chatRooms);
	const dispatch = useAppDispatch();

	const activeRoom = useAppSelector((state) => state.chat.activeRoom);
	const activeRoomId = activeRoom?.chatRoomId || null;

	useEffect(() => {
		const fetchChatrooms = async () => {
			const chatrooms = await getChatrooms(userId);
			dispatch(setChatRooms(chatrooms));
		};
		fetchChatrooms();
	}, [userId]);

	const handleRoomClick = () => {
		if (isMobile) {
			setShowChatWindowMobile(true);
		}
	};

	const handleBackToList = () => {
		setShowChatWindowMobile(false);
	};

	return (
		<div className="flex min-h-screen flex-col items-center bg-gray-300">
			{/* Nav bar */}
			<div className="fixed top-0 z-50 mb-3 w-full flex-none bg-white">
				<TopNav />
			</div>

			{/* content */}
			<div className="mt-20 flex h-[90vh] w-full flex-row justify-around gap-3 overflow-hidden rounded-xl bg-gray-100 p-3 md:h-[580px] md:w-10/12">
				{/* Chat rooms list - shown always on desktop, conditionally on mobile */}
				{(!isMobile || !showChatWindowMobile) && (
					<div className="flex w-full flex-col gap-2 overflow-y-auto rounded-lg bg-secondary p-3 scrollbar-hidden md:w-1/4">
						{[...rooms]
							.sort(
								(a, b) =>
									new Date(b.lastTimeStamp).getTime() -
									new Date(a.lastTimeStamp).getTime(),
							)
							.map((room) => (
								<ChatRoomItem
									key={room.chatRoomId}
									chatRoom={room}
									onClick={handleRoomClick}
								/>
							))}
					</div>
				)}

				{/* Chat window - shown always on desktop, conditionally on mobile */}
				{(!isMobile || showChatWindowMobile) && (
					<div className="flex w-full flex-col rounded-lg bg-secondary p-2 md:w-3/4">
						{isMobile && showChatWindowMobile && (
							<button
								onClick={handleBackToList}
								className="mb-2 flex items-center gap-1 text-sm text-gray-600"
							>
								<IoArrowBack /> Back to chats
							</button>
						)}
						{activeRoomId ? (
							<ChatWindow />
						) : (
                            <p className="text-center text-lg font-semibold text-accent">
                                Select a chat room
                            </p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Page;
