import { Message, User } from "@/common/model";
import { useAppSelector } from "@/states/hook";
import clsx from "clsx";
import React from "react";

const MessageItem = ({ messageItem, sender }: { messageItem: Message, sender?: User}) => {

    const userId = useAppSelector(state => state.user.user!.userId);
	const loggedInUser = useAppSelector(state => state.user.user); 

	return (
		<div className={clsx(`chat`, {
            'chat-start': userId !== messageItem.senderId,
            'chat-end': userId === messageItem.senderId,
        })}>
			<div className="avatar chat-image">
				<div className="w-10 rounded-full">
					<img
						alt="profile"
						src={loggedInUser?.profileUrl}
					/>
				</div>
			</div>
			<div className="chat-header">
                {/*  */}
				{messageItem.senderId === userId ? loggedInUser!.displayName : messageItem.senderId}
				<time className="mx-1 text-xs opacity-50">12:45</time>
			</div>
			<div className="chat-bubble bg-accent text-white">{messageItem.content}</div>
			<div className="chat-footer opacity-50">Delivered</div>
		</div>
	);
};

export default MessageItem;
