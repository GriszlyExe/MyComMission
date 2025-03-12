import React, { useEffect, useState } from "react";

/* stats icon */
import { FaDollarSign } from "react-icons/fa";
import { RiProgress1Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { useAppDispatch } from "@/states/hook";
import { setActiveRoom } from "@/states/features/chatSlice";
import { ChatRoom, User } from "@/common/model";
import { getUserInfo } from "@/service/userService";

const states = [
	{ name: "idle", icon: <></> },
	{
		name: "brief",
		icon: <IoDocumentText fontSize={40} className="text-success" />,
	},
	{
		name: "brief-reject",
		icon: <IoDocumentText fontSize={40} className="text-warning" />,
	},
	{
		name: "proposal",
		icon: <FaDollarSign fontSize={40} className="text-success" />,
	},
	{
		name: "proposal-reject",
		icon: <FaDollarSign fontSize={40} className="text-warning" />,
	},
	{
		name: "working",
		icon: <RiProgress1Line fontSize={40} className="text-success" />,
	},
	{
		name: "finished",
		icon: <FaCheckCircle fontSize={40} className="text-success" />,
	},
	{
		name: "canceled",
		icon: <MdOutlineCancel fontSize={40} className="text-error" />,
	},
];

const ChatroomItem = ({ chatRoom }: { chatRoom: ChatRoom }) => {

	const dispatch = useAppDispatch();
	const [receiver, setReceiver] = useState<User | null>(null);

	useEffect(() => {

		const fetchUserProfile = async () => {
			const user = await getUserInfo(chatRoom.user2.userId);
			setReceiver(user);
		};

		fetchUserProfile();

	}, [chatRoom.chatRoomId])

	return (
		<div className="flex flex-row items-center justify-between gap-2 rounded-md bg-white px-1 hover:bg-secondary"
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
				<span className="accent font-bold">{receiver !== null ? receiver.displayName : ""}</span>
				<p className="text-sm">Hello, how are you?</p>
			</div>

			{/* @ts-ignore */}
			<button className="py-3" onClick={()=>document.getElementById('status-info')!.showModal()}>
				{states[Math.floor(Math.random() * 8)].icon}
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
