"use client"

import React, { useEffect, useState } from "react";
import TopNav from "@/app/ui/global/nav-bar";

/* redux */
import { useAppSelector } from "@/states/hook";
import ChatRoomItem from "@/app/ui/chat/ChatRoomItem";
import ChatWindow from "../ui/chat/ChatWindow";
import { getChatrooms } from "@/service/chat";

const Page = () => {

    const userId = useAppSelector(state => state.user.user!.userId);
	const [rooms, setRooms] = useState<any[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

	useEffect(() =>{
		//Fetch Chatroom
		const fetchChatrooms = async () => {
			const chatrooms = await getChatrooms(userId);
			console.log({chatrooms}); // Or update your state with the chatrooms
			setRooms(chatrooms)
		};
		fetchChatrooms()
	},[userId])

	useEffect(() =>{
		console.log(`Now Chatroom = ${selectedRoom}`)
	},[selectedRoom])

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
					{rooms.map((chatroom)=>(
						<ChatRoomItem key={chatroom.chatRoomId} chatroom={chatroom} onSelect={setSelectedRoom}/>
					))}
				</div>

				{/* Chat window */}
				<div className="flex flex-col-reverse w-3/4 justify-center">
					{selectedRoom ? <ChatWindow chatRoomId={selectedRoom} senderId={userId}/> : <p>Select a chatroom</p>}
				</div>

			</div>
		</div>
	);
};

export default Page;
