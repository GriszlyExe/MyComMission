"use client"

import React from "react";
import TopNav from "@/app/ui/global/nav-bar";

/* redux */
import { useAppSelector } from "@/states/hook";
import ChatRoomItem from "@/app/ui/chat/ChatRoomItem";
import ChatWindow from "../ui/chat/ChatWindow";

const rooms = [
	{},
	{},
	{},
	{},
	{},
	{},
	{},
	{},
	{},
	{},
	{},
]

const page = () => {

    const userId = useAppSelector(state => state.user.user!.userId);

	return (
		<div className="flex min-h-screen flex-col items-center bg-gray-300">
            
            {/* Nav bar */}
			<div className="fixed top-0 z-50 mb-3 w-full flex-none bg-white">
				<TopNav />
			</div>

            {/* content */}
			
			<div className="mt-24 flex max-h-[600px] flex-row bg-gray-100 w-9/12 justify-around gap-3 p-3 overflow-hidden">
				
				{/* Chat rooms list */}
				<div className="flex flex-col w-1/4 gap-2 overflow-y-auto scrollbar-hidden">
					{rooms.map((_, idx) => <ChatRoomItem key={`room-${idx}`}/>)}
				</div>

				{/* Chat window */}
				<div className="flex flex-col-reverse w-3/4">
					<ChatWindow />
				</div>

			</div>
		</div>
	);
};

export default page;
