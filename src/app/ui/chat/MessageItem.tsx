import { Commission, Message, User } from "@/common/model";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import clsx from "clsx";
import { getCommissionById } from "@/service/commissionService";
import SendArtworkInChat from "./SendArtworkInChat";
import ImageModal from "../components/ImageModal";
import ChatImage from "./ChatImage";
import { IoDocumentText } from "react-icons/io5";
import CommissionInChat from "./CommissionInChat";

/* React */
import React, { Suspense, useEffect, useState } from "react";
import { clipText, formatMessageTimestamp } from "@/utils/helper";

const MessageItem = ({
	messageItem,
	sender,
}: {
	messageItem: Message;
	sender?: User;
}) => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state) => state.user.user!.userId);
	const loggedInUser = useAppSelector((state) => state.user.user);
	const receiver = useAppSelector((state) => state.chat.activeReceiver);
	
	const isMyMessage = messageItem.senderId === userId;

	const isMessage = messageItem.messageType == "MESSAGE";
	const isWorking = false;
	const isImage = messageItem.messageType == "IMAGE";
	
	const [commission, setCommission] = useState<Commission | null>(null);

	// const [isImageModalOpen, setIsImageModalOpen] = useState(false);

	useEffect(() => {
		const fetchCommission = async () => {
			if (messageItem.messageType === "COMMISSION") {
				try {
					const commissionData = await getCommissionById(
						messageItem.content,
					);

					// console.log(commissionData);
					setCommission(commissionData.commission);
				} catch (error) {
					console.error("Failed to fetch commission:", error);
				}
			}
		};

		fetchCommission();
	}, [messageItem]);
	
	if (messageItem.messageType === "COMMISSION" && !commission) {
		return <div><span className="loading loading-spinner loading-xl"></span></div>;
	}

	return (
		<div
		className={clsx(`chat`, {
			"chat-start": !isMyMessage,
				"chat-end": isMyMessage,
			})}
		>
			<div className="avatar chat-image">
				<div className="w-10 rounded-full">
					<img
						alt="profile"
						src={
							isMyMessage
								? loggedInUser!.profileUrl
								: receiver!.profileUrl
						}
					/>
				</div>
			</div>
			<div className="chat-header">
				{/*  */}
				{isMyMessage
					? loggedInUser!.displayName
					: receiver?.displayName}
				<time className="mx-1 text-xs opacity-50">{formatMessageTimestamp(messageItem.createdAt)}</time>
			</div>

			{/* plain text */}
			{isMessage && (
				<div className="chat-bubble bg-accent text-white">
					{messageItem.content}
				</div>
			)}

			{/* commission as brief */}
			{commission && (
				<div
					className="chat-bubble bg-accent px-3"
					onClick={() =>
						(
							document.getElementById(
								`commission-modal-${commission.commissionId}`,
							) as HTMLDialogElement
						)?.showModal()
					}
				>
					<button className="w-full rounded-md text-white hover:bg-secondary hover:text-accent">
						<div className="flex flex-row items-center justify-center gap-2">
							<IoDocumentText className="text-xl" />
							<p>Commission</p>
						</div>
					</button>
				</div>
			)}

			{isWorking && (
				<div className="chat-bubble bg-accent text-black">
					<SendArtworkInChat />
				</div>
			)}
			<div className="chat-footer opacity-50">Delivered</div>

			{isImage && <SendArtworkInChat />}
			<div className="chat-footer opacity-50">Delivered</div>

			{/* Modal for brief */}
			{commission !== null && <dialog
				id={`commission-modal-${commission.commissionId}`}
				className="modal"
			>
				<div className="modal-box max-w-xl">
					<CommissionInChat commission={commission} />
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>}

			{/* Modal for proposal */}
			{/* {commission !== null && <dialog
				id={`proposal-modal-${commission.commissionId}`}
				className="modal "
			>
				<div className="modal-box w-11/12 max-w-xl">
					<CommissionInChat commission={commission} />
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>} */}
		</div>
	);
};

export default MessageItem;
