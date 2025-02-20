import React from "react";

/* stats icon */
import { FaDollarSign } from "react-icons/fa";
import { RiProgress1Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

const states = [
	{ name: "brief", icon: <IoDocumentText fontSize={40} className="text-info"/> },
	{ name: "brief-reject", icon: <IoDocumentText /> },
	{ name: "proposal", icon: <FaDollarSign /> },
	{ name: "proposal-reject", icon: <FaDollarSign /> },
	{ name: "working", icon: <RiProgress1Line /> },
	{ name: "finished", icon: <FaCheckCircle /> },
	{ name: "canceled", icon: <MdOutlineCancel /> },
];

const ChatroomItem = () => {
	return (
		<div className="flex flex-row justify-between gap-2 px-1">
			{/* profile avatar */}
			<div>
				<div className="h-16 w-16 overflow-hidden rounded-full border border-gray-300">
					<img
						src={`/default-profile-2.png`}
						alt="Profile"
						className="h-full w-full overflow-hidden rounded-full border border-gray-300 object-cover"
						width={50}
						height={50}
					/>
				</div>
			</div>

			{/* name + latest message */}
			<div className="flex flex-grow flex-col p-2">
				<span className="accent font-bold">Gabriel</span>
				<p>Hello, how are you?</p>
			</div>

			{/* state */}
			<div className="py-3">
                {states[0].icon}
            </div>
		</div>
	);
};

export default ChatroomItem;
