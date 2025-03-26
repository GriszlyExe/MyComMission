// import { Message } from "@/common/model";
import { createMessage } from "@/service/chatService";
import React, { useState } from "react";
// import { io } from "socket.io-client";
import { Divide, Plus, X } from "lucide-react";
import ChatOptions from "./ChatOptions";
import { useAppSelector } from "@/stores/hook";

const MessageInput = () => {

	const [message, setMessage] = useState<string>("");
	const [showOptions, setShowOptions] = useState(false);
	const loggedInUserId = useAppSelector(state => state.user.user!.userId);
	const activeRoomId = useAppSelector(state => {
		if (state.chat.activeRoom) {
			return state.chat.activeRoom.chatRoomId;
		}
		return null;
	});

	const sendMessage = async (message: string) => {
		await createMessage({
			chatRoomId: activeRoomId!,
			senderId: loggedInUserId,
			content: message,
			messageType: "MESSAGE"
		})
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!message.trim()) return;
		sendMessage(message);
		setMessage("");
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="pb-1 pt-2 px-2 flex flex-row items-center justify-around gap-2 border-t border-gray-200"
			>

				{/* add button Section */}

				<div>
					{/* Plus Icon with Options */}
					<div className="">
						<button
							onClick={() => setShowOptions(!showOptions)}
							type="button"
							className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform duration-300"
						>
							{showOptions ? <X size={20} className="transform rotate-180 transition-all duration-300" /> : <Plus size={20} className="transition-all duration-300" />}
						</button>
					</div>
				</div>

				{/* text input section */}
				<input
					type="text"
					value={message}
					placeholder="Type your message..."
					onChange={(e) => setMessage(e.target.value)}
					className="input input-bordered input-primary w-full focus:ring-primary"
				/>
				<button
					type="submit"
					className="ml-1 rounded-lg bg-primary px-8 py-3 text-white hover:bg-accent 
                            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
				>
					Send
				</button>
			</form>
			{showOptions && <div className="flex justify-around py-1"> <ChatOptions closeOption={() => setShowOptions(false)} /> </div>}
		</div>
	);
};

export default MessageInput;
