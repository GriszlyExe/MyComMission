"use client"

import React from "react";
import TopNav from "@/app/ui/global/nav-bar";

/* redux */
import { useAppSelector } from "@/states/hook";
import ChatRoomItem from "@/app/ui/chat/ChatRoomItem";

const page = () => {

    const userId = useAppSelector(state => state.user.user!.userId);

	return (
		<div className="flex min-h-screen flex-col items-center bg-gray-300">
            
            {/* Nav bar */}
			<div className="fixed top-0 z-50 mb-3 w-full flex-none bg-white">
				<TopNav />
			</div>

            {/* content */}
			<div className="mt-24 flex flex-row bg-gray-100 w-8/12 justify-around gap-3 p-3">
				{/* Chat rooms list */}
				<div className="flex flex-col w-1/3">
					<ChatRoomItem />
				</div>

				{/* Chat window */}
				<div className="w-2/3 min-h-[640px]">

				</div>
			</div>
		</div>
	);
};

export default page;
