import { Message, User } from "@/common/model";
import { useAppSelector } from "@/states/hook";
import clsx from "clsx";
import React, { useState } from "react";

const MessageItem = ({ messageItem, sender }: { messageItem: Message, sender?: User}) => {

    const userId = useAppSelector(state => state.user.user!.userId);
	const loggedInUser = useAppSelector(state => state.user.user); 
	const receiver = useAppSelector(state => state.chat.activeReceiver);
	const isMyMessage = messageItem.senderId === userId;


	return (
		<div className={clsx(`chat`, {
            'chat-start': !isMyMessage,
            'chat-end': isMyMessage,
        })}>
			<div className="avatar chat-image">
				<div className="w-10 rounded-full">
					<img
						alt="profile"
						src={isMyMessage ? loggedInUser!.profileUrl : receiver!.profileUrl}
					/>
				</div>
			</div>
			<div className="chat-header">
                {/*  */}
				{isMyMessage ? loggedInUser!.displayName : receiver?.displayName}
				<time className="mx-1 text-xs opacity-50">12:45</time>
			</div>
			<div className="chat-bubble bg-accent text-white">{messageItem.content}</div>
			<div className="chat-footer opacity-50">Delivered</div>
		</div>
	);
};

export default MessageItem;
