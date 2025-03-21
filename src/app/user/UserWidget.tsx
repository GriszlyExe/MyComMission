"use client";

import { User } from "@/common/model";
import Link from "next/link";
import { MdStarRate } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Chatting01Icon } from "hugeicons-react";

export default function UserWidget({ userInfo }: { userInfo: User }) {
	const router = useRouter();

	const handleChatClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		router.push("/chat");
	};

	console.log(userInfo);

	return (
		<Link
			href={`/profile/${userInfo.userId}`}
			className="mb-1 flex w-full flex-row gap-3 rounded-md border border-gray-300 py-2 pl-2 pr-6 hover:bg-gray-200"
		>
			{/* User profile */}
			<div>
				<div className="aspect-square w-14 overflow-hidden rounded-full bg-gradient-to-b from-violet-500 via-white to-blue-500 p-[4px]">
					<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
						<img
							src={userInfo.profileUrl}
							alt=""
							className="h-full w-full overflow-hidden rounded-full object-cover"
						/>
					</div>
				</div>
			</div>

			{/* UserInfo */}
			<div className="flex flex-col">
				<div className="flex flex-row gap-1">
					<div className="m-auto w-full text-start">
						{userInfo.displayName}
					</div>
					{userInfo.artistRate && (
						<div className="flex flex-row min-w-32 gap-1 items-center">
							<MdStarRate className="text-xl text-yellow-400" />
							{userInfo.artistRate.toFixed(2)}
							{" "}/ 5.00
						</div>
					)}
				</div>
				<div className="my-auto text-sm">This is the end</div>
			</div>

			{/* Chat icon */}
			<button
				className="my-aut ml-auto cursor-pointer border-none bg-transparent p-0"
				onClick={handleChatClick}
			>
				<Chatting01Icon className="scale-150" />
			</button>
		</Link>
	);
}
