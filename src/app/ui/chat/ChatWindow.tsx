import { Message } from "@/common/model";
import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";

const mockMessages: Message[] = [
	{
		messageId: "1",
		roomId: "101",
		senderId: "1",
		type: "MESSAGE",
		content: "Hey, how are you doing?",
		createdAt: "2024-02-22T10:15:00Z",
	},
	{
		messageId: "2",
		roomId: "101",
		senderId: "2",
		type: "MESSAGE",
		content: "I'm doing great, thanks for asking!",
		createdAt: "2024-02-22T10:16:30Z",
	},
	{
		messageId: "3",
		roomId: "101",
		senderId: "1",
		type: "MESSAGE",
		content: "Quick summary: We need to finalize the proposal today.",
		createdAt: "2024-02-22T10:18:45Z",
	},
	{
		messageId: "4",
		roomId: "102",
		senderId: "2",
		type: "MESSAGE",
		content: "Proposal: Increase the marketing budget by 15% next quarter.",
		createdAt: "2024-02-22T11:05:00Z",
	},
	{
		messageId: "5",
		roomId: "102",
		senderId: "2",
		type: "MESSAGE",
		content: "https://example.com/image1.jpg",
		createdAt: "2024-02-22T11:07:20Z",
	},
	{
		messageId: "6",
		roomId: "103",
		senderId: "1",
		type: "MESSAGE",
		content: "Let’s schedule a meeting for next Monday.",
		createdAt: "2024-02-22T11:30:00Z",
	},
	{
		messageId: "7",
		roomId: "103",
		senderId: "1",
		type: "MESSAGE",
		content: "Meeting agenda: Discuss Q2 targets and KPIs.",
		createdAt: "2024-02-22T11:32:10Z",
	},
];

const ChatWindow = () => {

    const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, []);

	return (
		<div className="p-1">
			<div ref={containerRef} className="max-h-[550px] overflow-y-auto overflow-x-hidden scrollbar-hidden mt-1">
				{mockMessages.map((message) => (
					<MessageItem
						messageItem={message}
						key={`message-${message.messageId}`}
					/>
				))}
				{mockMessages.map((message) => (
					<MessageItem
						messageItem={message}
						key={`message-shd-${message.messageId}`}
					/>
				))}
			</div>
            <MessageInput />
		</div>
	);
};

export default ChatWindow;
