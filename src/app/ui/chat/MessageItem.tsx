import { Commission, Message, User } from "@/common/model";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import clsx from "clsx";
import BriefInChat from "./BriefInChat";
import { getCommissionById } from "@/service/commissionService";
import ProposalInChat from "./ProposalInChat";
import SendArtworkInChat from "./SendArtworkInChat";
import ImageModal from "../components/ImageModal";
import ChatImage from "./ChatImage";
import { IoDocumentText } from "react-icons/io5";
import CommissionInChat from "./CommissionInChat";

/* React */
import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

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

	const [isImageModalOpen, setIsImageModalOpen] = useState(false);

	useEffect(() => {
		const fetchCommission = async () => {
			if (messageItem.messageType === "COMMISSION") {
				try {
					const commissionData = await getCommissionById(
						messageItem.content,
					);

					console.log(commissionData);
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
				<time className="mx-1 text-xs opacity-50">12:45</time>
			</div>

			{/* plain text */}
			{isMessage && (
				<div className="chat-bubble bg-accent text-white">
					{messageItem.content}
				</div>
			)}

			{/* commission as brief */}
			{commission && commission.state === "BRIEF" && (
				<div
					className="chat-bubble bg-accent text-black"
					onClick={() =>
						(
							document.getElementById(
								`brief-modal-${commission.artistId}-${commission.commissionName}`,
							) as HTMLDialogElement
						)?.showModal()
					}
				>
					<button className="w-full rounded-md bg-white hover:bg-gray-300">
						<div className="flex flex-row items-center justify-center py-1 px-3 gap-2">
							<IoDocumentText className="text-xl" />
							<div>{commission.commissionName}(brief)</div>
						</div>
					</button>
				</div>
			)}

		    {/* commission as proposal */}
			{commission && commission.state === "PROPOSAL" && (
				<div
					className="chat-bubble bg-accent text-black"
					onClick={() =>
						(
							document.getElementById(
								`proposal-modal-${commission.artistId}-${commission.commissionName}`,
							) as HTMLDialogElement
						)?.showModal()
					}
				>
					<button className="w-full rounded-md bg-white hover:bg-gray-300">
						<div className="flex flex-row items-center justify-center py-1 px-2 gap-1">
							<IoDocumentText className="text-xl" />
							<div>{commission.commissionName}(proposal)</div>
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
				id={`brief-modal-${commission.artistId}-${commission.commissionName}`}
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
			{commission !== null && <dialog
				id={`proposal-modal-${commission.artistId}-${commission.commissionName}`}
				className="modal "
			>
				<div className="modal-box w-11/12 max-w-xl">
					<CommissionInChat commission={commission} />
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>}
		</div>
	);
};

export default MessageItem;
