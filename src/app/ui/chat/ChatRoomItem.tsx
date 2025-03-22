import React, { useEffect, useState } from "react";

/* stats icon */
import { FaBoxOpen, FaDollarSign, FaTimesCircle } from "react-icons/fa";
import { RiProgress1Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { setActiveRoom } from "@/states/features/chatSlice";
import { ChatRoom, User } from "@/common/model";
import { getUserInfo } from "@/service/userService";
import clsx from "clsx";
import Link from "next/link";

// const 

const states = [
	{ name: "IDLE", icon: <></> },
	{
		name: "BRIEF",
		icon: <IoDocumentText fontSize={40} className="text-info" />,
	},
	{
		name: "BRIEF_REJECTED",
		icon: <IoDocumentText fontSize={40} className="text-warning" />,
	},
	{
		name: "PROPOSAL",
		icon: <FaDollarSign fontSize={40} className="text-success" />,
	},
	{
		name: "PROPOSAL_REJECTED",
		icon: <FaDollarSign fontSize={40} className="text-warning" />,
	},
	{
		name: "WORKING",
		icon: <RiProgress1Line fontSize={40} className="text-success" />,
	},
	{
		name: "ARTWORK_SHIPPED",
		icon: <FaBoxOpen fontSize={40} className="text-info" />,
	},
	{
		name: "ARTWORK_REJECTED",
		icon: <FaTimesCircle fontSize={40} className="text-error" />,
	},
	{
		name: "FINISHED",
		icon: <FaCheckCircle fontSize={40} className="text-success" />,
	},
	{
		name: "CANCELED",
		icon: <MdOutlineCancel fontSize={40} className="text-error" />,
	},
];

const ChatroomItem = ({ chatRoom }: { chatRoom: ChatRoom }) => {

	const dispatch = useAppDispatch();
	const [receiver, setReceiver] = useState<User | null>(null);
	const activeRoomId = useAppSelector(state => state.chat.activeRoom?.chatRoomId);

	useEffect(() => {

		const fetchUserProfile = async () => {
			const user = await getUserInfo(chatRoom.user2.userId);
			setReceiver(user);
		};

		fetchUserProfile();

	}, [chatRoom.chatRoomId])

	return (
		<div className={clsx("flex flex-row items-center justify-between gap-2 rounded-md bg-white px-1", {
			"ring-4 ring-primary": chatRoom.chatRoomId === activeRoomId,
		})}
		onClick={() => {
			dispatch(setActiveRoom(chatRoom));
		}}
		>
			{/* profile avatar */}
			<div>
				<div className="h-12 w-12 overflow-hidden rounded-full border border-gray-300">
					<img
						src={receiver !== null ? receiver.profileUrl : `/default-profile-2.png`}
						alt="Profile"
						className="h-full w-full overflow-hidden rounded-full border border-gray-300 object-cover"
						width={50}
						height={50}
					/>
				</div>
			</div>

			{/* name + latest message */}
			<div className="flex flex-grow flex-col p-2">
				<Link href={`/profile/${receiver?.userId}`}>
					<span className="accent font-bold hover:underline">{receiver !== null ? receiver.displayName : ""}</span>
				</Link>
				<p className="text-sm">Hello, how are you?</p>
			</div>

			{/* @ts-ignore */}
			<button className="py-3" onClick={()=>document.getElementById('status-info')!.showModal()}>
				{states.filter(state => {
					if (!chatRoom.latestCommission) return state.name === "IDLE";
					return state.name === chatRoom.latestCommission.state;
				})[0].icon}
			</button>
			<dialog id="status-info" className="modal">
				<div className="modal-box">
					<h3 className="text-lg font-bold">Hello!</h3>
					<p className="py-4">
						Press ESC key or click the button below to close
					</p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn text-white">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default ChatroomItem;
