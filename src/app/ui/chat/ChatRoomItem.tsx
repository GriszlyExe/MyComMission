import React, { useEffect, useState } from "react";

/* stats icon */
import { FaBoxOpen, FaDollarSign, FaTimesCircle } from "react-icons/fa";
import { RiProgress1Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { setActiveRoom } from "@/stores/features/chatSlice";
import { ChatRoom, User } from "@/common/model";
import { getUserInfo } from "@/service/userService";
import clsx from "clsx";
import Link from "next/link";
import { clipText, formatChatTimestamp } from "@/utils/helper";
import { getCommissionById } from "@/service/commissionService";

// const

const states = [
	{ name: "IDLE", icon: <></>, info: "No commission in progress" },
	{
		name: "BRIEF",
		icon: <IoDocumentText fontSize={40} className="text-primary" />,
		info: "Brief is waiting for approval",
	},
	{
		name: "BRIEF_REJECTED",
		icon: <IoDocumentText fontSize={40} className="text-primary" />,
		info: "Brief is rejected",
	},
	{
		name: "PROPOSAL",
		icon: <FaDollarSign fontSize={40} className="text-primary" />,
		info: "Proposal is waiting for approval",
	},
	{
		name: "PROPOSAL_REJECTED",
		icon: <FaDollarSign fontSize={40} className="ttext-primary" />,
		info: "Proposal is rejected",
	},
	{
		name: "WORKING",
		icon: <RiProgress1Line fontSize={40} className="text-primary" />,
		info: "Artist is working on it",
	},
	{
		name: "ARTWORK_SHIPPED",
		icon: <FaBoxOpen fontSize={40} className="text-primary" />,
		info: "Artist already sent the artwork waiting for customer approval",
	},
	{
		name: "ARTWORK_REJECTED",
		icon: <FaTimesCircle fontSize={40} className="text-primary" />,
	},
	{
		name: "FINISHED",
		icon: <FaCheckCircle fontSize={40} className="text-primary" />,
		info: "Artwork is finished",
	},
	{
		name: "CANCELED",
		icon: <MdOutlineCancel fontSize={40} className="text-error" />,
	},
];

const StateModal = ({
	roomState,
	modalId,
}: {
	roomState?: string;
	modalId: string;
}) => {
	// const stateInfo =

	return (
		<>
			<button
				className="rounded-md bg-primary px-1 text-xs text-white hover:bg-accent"
				onClick={() =>
					// @ts-ignore
					document.getElementById(`status-info-${modalId}`)!.showModal()
				}
			>
				Status
			</button>
			<dialog id={`status-info-${modalId}`} className="modal">
				<div className="modal-box">
					<h3 className="flex flex-row items-center gap-1 text-lg font-bold">
						{
							states.filter((state) => {
								if (!roomState) return state.name === "IDLE";
								return state.name === roomState;
							})[0].icon
						}
						{roomState}
					</h3>
					<div className="flex flex-row items-center gap-1">
						<p className="flex-grow py-4">
							{
								states.filter((state) => {
									if (!roomState)
										return state.name === "IDLE";
									return state.name === roomState;
								})[0].info
							}
						</p>
						<div className="modal-action">
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="btn text-white">
									Close
								</button>
							</form>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
};

const ChatRoomItem = ({
	chatRoom,
	onClick,
}: {
	chatRoom: ChatRoom;
	onClick?: () => void;
}) => {
	const dispatch = useAppDispatch();
	const [receiver, setReceiver] = useState<User | null>(null);
	const activeRoomId = useAppSelector(
		(state) => state.chat.activeRoom?.chatRoomId,
	);

	useEffect(() => {
		const fetchUserProfile = async () => {
			const user = await getUserInfo(chatRoom.user2.userId);
			setReceiver(user);
		};

		fetchUserProfile();
	}, [chatRoom.chatRoomId]);

	const handleClick = async () => {
		dispatch(setActiveRoom(chatRoom));
		if (onClick) onClick();
	};

	return (
		<div
			className={clsx(
				"flex cursor-pointer flex-row items-center justify-between gap-2 rounded-md bg-white px-1 transition-transform duration-300 hover:scale-105 md:min-h-[60px]",
				{
					"ring-4 ring-primary": chatRoom.chatRoomId === activeRoomId,
				},
			)}
			onClick={handleClick}
		>
			{/* profile avatar */}
			<div>
				<div className="h-12 w-12 overflow-hidden rounded-full border border-gray-300">
					<img
						src={
							receiver !== null
								? receiver.profileUrl
								: `/default-profile-2.png`
						}
						alt="Profile"
						className="h-full w-full overflow-hidden rounded-full border border-gray-300 object-cover"
						width={50}
						height={50}
					/>
				</div>
			</div>

			{/* name + latest message */}
			<div className="flex flex-grow flex-col p-2">
				<span className="flex flex-row items-center gap-1">
					{/* name */}
					<Link
						href={`/profile/${receiver?.userId}`}
						className="accent font-bold hover:text-accent"
						onClick={(e) => e.stopPropagation()}
					>
						{receiver !== null ? receiver.displayName : ""}
					</Link>
					<div className="flex-grow"></div>
					{/* time stamp */}
					<p className="text-xs">
						{formatChatTimestamp(chatRoom.lastTimeStamp)}
					</p>
				</span>
				<div className="flex flex-row gap-1 items-center">
					<p className="flex-grow text-sm w-6">
						{chatRoom.latestMessageType === "COMMISSION"
							? "Commission on going"
							: clipText(chatRoom.latestMessage, 12)}
					</p>
					<div>
						<StateModal
							roomState={chatRoom.latestCommission?.state}
							modalId={chatRoom.chatRoomId}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatRoomItem;
