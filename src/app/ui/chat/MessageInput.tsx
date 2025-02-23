import { Message } from "@/common/model";
import { createMessage } from "@/service/chat";
import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:12345");

const MessageInput = ({chatRoomId,senderId}:{chatRoomId:string,senderId:string}) => {
	const [message, setMessage] = useState<string>("");
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!message.trim()) return;

		const CM = async () => {
			const res = await createMessage({
				chatRoomId,
				senderId,
				content:message,
				messageType:"MESSAGE"
			})
			// setNewMessage(res.newMessage)
			const newMessage = res.newMessage
			if(newMessage){
				socket.emit("send_message", { newMessage });
			}
			console.log(newMessage)
		}

		CM()


		setMessage("")
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-row items-center gap-2 border-t border-gray-200 p-2"
		>
			<input
				type="text"
				value={message}
				placeholder="Type your message..."
				onChange={(e) => setMessage(e.target.value)}
				className="input input-bordered input-primary w-full focus:ring-primary"
			/>
			<button
				type="submit"
				className="ml-3 rounded-md bg-primary px-8 py-3 text-white hover:bg-accent 
                            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
			>
				Send
			</button>
		</form>
	);
};

export default MessageInput;
