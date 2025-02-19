"use client";

import Feed from "@/app/ui/components/Feed";
import TopNav from "@/app/ui/global/nav-bar";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { setUser } from "@/states/features/userSlice";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa6";
import { getUserInfo } from "@/service/userService";
import { User } from "@/common/model";
import PostForm from "@/app/ui/post/create-form";
import FeedProfile from "@/app/ui/components/FeedProfile";
import SuggestedBar from "@/app/ui/components/SuggestedBar";

export default function ProfilePage() {
	const me = useAppSelector((state) => state.user.user!);
	const [userInfo, setUserInfo] = useState<User>(me);
	const userId = useAppSelector((state) => state.user.user?.userId);
	const [activeTab, setActiveTab] = useState("posts");
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const fetchUserProfile = async () => {
		const user = await getUserInfo(id as string);
		return user;
	};

	useEffect(() => {
		fetchUserProfile().then((user) => {
			if (user.userId === userId) {
				dispatch(setUser({ user }));
			}
			// console.log(user);
			setUserInfo(user);
			// console.log(userInfo);
		});
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center bg-gray-300">
			{/* Nav Bar */}
			<div className="fixed top-0 z-50 mb-3 w-full flex-none bg-white">
				<TopNav />
			</div>

			<div className="mx-auto flex w-full flex-row items-start justify-center">
				{/* Left Sidebar */}
				<SuggestedBar />

				{/* Center Feed */}
				<div className="mt-20 flex w-full max-w-3xl md:mx-4">
					<div className="w-full rounded-md bg-base-300">
						{/* Profile */}
						<div className="mb-10 flex flex-row">
							<div>
								{/* User profile */}
								<div className="ml-16 mt-16 aspect-square w-40 overflow-hidden rounded-full bg-gradient-to-b from-violet-500 via-white to-blue-500 p-[4px]">
									<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
										<img
											src={userInfo.profileUrl}
											alt=""
											width={112}
											height={112}
											className="h-full w-full overflow-hidden rounded-full object-cover"
										/>
									</div>
								</div>
							</div>

							{/* Information */}
							<div className="w-full">
								<div className="m-16 flex flex-col gap-2">
									<div>
										<h1 className="text-2xl font-bold">
											{userInfo.displayName}
										</h1>
										<span className="text-textGray text-sm">
											@{userInfo.displayName}
										</span>
									</div>
									<p>I'm gonna be king of pirate</p>

									<div className="flex gap-4 text-base">
										<div className="flex items-center gap-2">
											<FaLocationDot />
											<span>Laugh Tale</span>
										</div>
										<div className="flex items-center gap-2">
											<FaCalendarDay />
											<span>
												Joined{" "}
												{`${month[new Date(userInfo.createdAt).getMonth()]} ${new Date(userInfo.createdAt).getFullYear()}`}
											</span>
										</div>
									</div>
									<div className="flex gap-4">
										<div className="flex items-center gap-2">
											<span className="font-bold">
												100k
											</span>
											<span className="text-base">
												Followers
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-bold">
												100k
											</span>
											<span className="text-base">
												Followings
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* <PostForm /> */}

						{/* Switch Tab */}
						<div className="flex flex-row justify-center p-2">
							<div className={`w-1/2 pl-5`}>
								<button
									className={`font-bold ${activeTab === "posts" ? "border-b-4 border-base-200 text-base-200" : "text-gray-700"}`}
									onClick={() => handleTabClick("posts")}
								>
									POSTS
								</button>
							</div>
							<div className="w-1/2">
								<button
									className={`font-bold ${activeTab === "artworks" ? "border-b-4 border-base-200 text-base-200" : "text-gray-700"}`}
									onClick={() => handleTabClick("artworks")}
								>
									ARTWORKS
								</button>
							</div>
						</div>

						{/* Feed */}

						{activeTab === "posts" && <FeedProfile />}
						{activeTab === "artworks" && <FeedProfile />}
						{/* {activeTab === "posts" && <FeedProfile />} */}
					</div>
				</div>
			</div>
		</div>
	);
}
