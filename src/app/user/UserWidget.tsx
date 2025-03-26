"use client";

import { User } from "@/common/model";
import Link from "next/link";
import { MdStarRate } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/stores/hook";
import { createChatroom } from "@/service/chatService";

/* chat-icon */
import { Chatting01Icon } from "hugeicons-react";
import { IoChatbubbleEllipses } from "react-icons/io5";

export default function UserWidget({ userInfo }: { userInfo: User }) {
	const loggedInUserId = useAppSelector(state => state.user.user!.userId);
	const router = useRouter();
	const handleChatClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		router.push("/chat");
		try {
			const { chatroom } = await createChatroom({
				creatorId: loggedInUserId,
				memberId: userInfo.userId as string,
			});

			if (!chatroom) {
				throw new Error("Something went wrong!");
			}

			router.push("/chat");
		} catch (error) {
			console.error(error);
		}
	};

	// console.log(userInfo);

	return (
		<Link
			href={`/profile/${userInfo.userId}`}
			className="mb-1 flex w-full flex-row gap-3 rounded-md border border-gray-300 py-2 pl-2 pr-6 transition-transform duration-300 hover:scale-105"
		>
			{/* User profile */}
			<div>
				<div className="aspect-square w-14 overflow-hidden">
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
			<div className="flex flex-col justify-around py-1">
				<div className="flex flex-row gap-1">
					<div className="m-auto w-full text-start font-bold hover:underline">
						{userInfo.displayName}
					</div>
					{/* {userInfo.artistRate && ( */}
						<div className="flex flex-row min-w-32 gap-1 items-center">
							<MdStarRate className="text-xl text-yellow-400" />
							{userInfo.artistRate.toFixed(2)}
							{" "}/ 5.00
						</div>
					{/* )} */}
				</div>
				<div className="text-sm">This is the end</div>
			</div>

			{/* Chat icon */}
			{loggedInUserId !== userInfo.userId && <button
				className="my-aut ml-auto cursor-pointer border-none bg-transparent p-0"
				onClick={handleChatClick}
			>
				{/* <Chatting01Icon className="scale-150" /> */}
				<IoChatbubbleEllipses fontSize={45} className="text-primary"/>
			</button>}
		</Link>
	);
}
