import { Message, User } from "@/common/model";
import { useAppSelector } from "@/states/hook";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import BriefInChat from "./BriefInChat";
import { getCommissionById } from "@/service/commissionService";


const MessageItem = ({ messageItem, sender }: { messageItem: Message, sender?: User}) => {

    const userId = useAppSelector(state => state.user.user!.userId);
	const loggedInUser = useAppSelector(state => state.user.user); 
	const receiver = useAppSelector(state => state.chat.activeReceiver);
	const isMyMessage = messageItem.senderId === userId;

	// console.log(messageItem.messageType);
	const is_message = messageItem.messageType == "MESSAGE";
	const is_brief = messageItem.messageType == "BRIEF";

	// console.log("message" + is_message);
	// console.log("brief" + is_brief);
	const [commission, setCommission] = useState({
		commissionName: "",
		briefDescription: "",
		deadline: "",
		budget: "",
		commercialUse: false,
		artistId: "",
		state: "",
	});

	useEffect(() => {
		const fetchCommission = async () => {
			if (is_brief) {
				try {
					const commissionData = await getCommissionById(messageItem.content);

					setCommission(commissionData.commission);
					// console.log(commission)
				} catch (error) {
					console.error("Failed to fetch commission:", error);
				}
			}
		};

		fetchCommission();
	}, [messageItem]);

	// console.log(commission)

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
			{is_message&& <div className="chat-bubble bg-accent text-white">{messageItem.content}</div>}
			{is_brief && <div className="chat-bubble bg-accent text-black"> <BriefInChat
                            commissionName={commission.commissionName}
                            briefDescription={commission.briefDescription}
                            dueDate={commission.deadline || ""}
                            budget={commission.budget}
                            commercialUse={commission.commercialUse}
                            artistId={commission.artistId}
                            state={commission.state || ""}
                        />  </div>  }
			<div className="chat-footer opacity-50">Delivered</div>
		</div>
	);
};

export default MessageItem;
