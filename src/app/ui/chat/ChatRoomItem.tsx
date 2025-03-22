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
import { clipText } from "@/utils/helper";

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
	return (
		<>
			<button
				className="py-3"
				onClick={() =>
					// @ts-ignore
					document.getElementById(`status-info-${modalId}`)!.showModal()
				}
			>
				{
					states.filter((state) => {
						if (!roomState) return state.name === "IDLE";
						return state.name === roomState;
					})[0].icon
				}
			</button>
			<dialog id={`status-info-${modalId}`} className="modal">
				<div className="modal-box">
					<h3 className="text-lg font-bold flex flex-row gap-1 items-center">{states.filter((state) => {
						if (!roomState) return state.name === "IDLE";
						return state.name === roomState;
					})[0].icon}{roomState}</h3>
					<div className="flex flex-row gap-1 items-center">
					<p className="py-4 flex-grow">
						{states.filter((state) => {
						if (!roomState) return state.name === "IDLE";
						return state.name === roomState;
					})[0].info}
					</p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn text-white">Close</button>
						</form>
					</div>
					</div>
				</div>
			</dialog>
		</>
	);
};

const ChatroomItem = ({ chatRoom }: { chatRoom: ChatRoom }) => {
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

	return (
		<div
			className={clsx(
				"flex flex-row md:min-h-[60px] items-center justify-between gap-2 rounded-md bg-white px-1 transition-transform duration-300 hover:scale-105",
				{
					"ring-4 ring-primary": chatRoom.chatRoomId === activeRoomId,
				},
			)}
			onClick={() => {
				dispatch(setActiveRoom(chatRoom));
			}}
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
				<span className="">
					<Link
						href={`/profile/${receiver?.userId}`}
						className="accent font-bold hover:underline"
					>
						{receiver !== null ? receiver.displayName : ""}
					</Link>
				</span>
				<p className="text-sm">{chatRoom.latestMessageType === "COMMISSION" ? "Commission on going" : clipText(chatRoom.latestMessage, 18)}</p>
				{/* <p className="text-sm">Hello, How are you?</p> */}
			</div>

			{/* @ts-ignore */}
			<StateModal
				roomState={chatRoom.latestCommission?.state}
				modalId={chatRoom.chatRoomId}
			/>
		</div>
	);
};

export default ChatroomItem;
