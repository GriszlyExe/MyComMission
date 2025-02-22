import { Message, User } from "@/common/model";
import { useAppSelector } from "@/states/hook";
import clsx from "clsx";
import React from "react";

const MessageItem = ({ messageItem, sender }: { messageItem: Message, sender?: User}) => {

    // const userId = useAppSelector(state => state.user.user!.userId);
    const userId = '1';

	return (
		<div className={clsx(`chat`, {
            'chat-start': userId !== messageItem.senderId,
            'chat-end': userId === messageItem.senderId,
        })}>
			<div className="avatar chat-image">
				<div className="w-10 rounded-full">
					<img
						alt="profile"
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
					/>
				</div>
			</div>
			<div className="chat-header">
                {/*  */}
				Obi-Wan Kenobi
				<time className="mx-1 text-xs opacity-50">12:45</time>
			</div>
			<div className="chat-bubble bg-accent text-white">{messageItem.content}</div>
			<div className="chat-footer opacity-50">Delivered</div>
		</div>
	);
};

export default MessageItem;
