import { Message } from "@/common/model";
import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import {io} from "socket.io-client"
import { getMessageChatroom } from "@/service/chat";
import BriefInChat from "./BriefInChat";

const socket = io(process.env.SERVER_ADDRESS);

const ChatWindow = ({chatRoomId,senderId}:{chatRoomId:string,senderId:string}) => {

    const containerRef = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		// Fetch messages from backend
		const fetchMessageChatroom = async () =>{
			const res = await getMessageChatroom(chatRoomId)
			setMessages(res.messages)
		}
	
		fetchMessageChatroom()
		
		// Listen for incoming messages
		socket.on("receive-message", ({newMessage}) => {
			console.log(`Receiving Message: ${newMessage.content} with ${newMessage.senderId}`)
			if (newMessage.chatRoomId === chatRoomId) {
			setMessages((prev) => [...prev, newMessage]);
			}
		});



		socket.emit("join_room",{senderId,chatRoomId})

		return () => {
			socket.off("receive-message");
		};
	}, [chatRoomId]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div>
			<div className="p-1 max-h-[500px] h-[500px]">
				<div ref={containerRef} className="max-h-[460px] overflow-y-auto overflow-x-hidden scrollbar-hidden mt-2">
					{messages.map((message) => (
						<MessageItem messageItem={message} key={message.messageId}/>
					))}
				</div>
			</div>
			<MessageInput chatRoomId={chatRoomId} senderId={senderId}/>
		</div>

	);
};

export default ChatWindow;
