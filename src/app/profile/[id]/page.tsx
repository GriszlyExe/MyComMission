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
		});
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center bg-primary">
			{/* Nav Bar */}
			<div className="fixed top-0 z-50 mb-3 w-full flex-none bg-white">
				<TopNav />
			</div>

			<div className="mx-auto flex w-full max-w-7xl flex-row items-start">
				{/* Left Sidebar */}
				<div className="sticky top-20 w-1/3 rounded-md bg-base-300 p-4">
					{/* <div className="sticky top-4"> */}
					<h2 className="text-xl font-bold">Suggested Artist</h2>
					<ul className="mt-4 space-y-2">
						<li>
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">Artist1</span>
							</Link>
						</li>
						<li>
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">Artist2</span>
							</Link>
						</li>
						<li>
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">Artist3</span>
							</Link>
						</li>
					</ul>
					{/* </div> */}
				</div>

				{/* Center Feed */}
				<div className="mx-4 mt-20 flex w-1/2 max-w-2xl">
					<div className="w-full max-w-2xl rounded-md bg-base-300">
						{/* Profile */}
						<div className="relative mb-12 w-full">
							{/* Background profile */}
							<div className="relative aspect-[3/1] w-full rounded-t-md bg-base-200"></div>
							{/* User profile */}
							<div className="absolute left-4 w-1/5 -translate-y-1/2 overflow-hidden rounded-full border-4 border-primary bg-gray-300">
								<Image
									src={userInfo.profileUrl}
									alt=""
									width={100}
									height={100}
								/>
							</div>
						</div>
						{/* Information */}
						<div className="flex flex-col gap-2 p-4">
							<div>
								<h1 className="text-2xl font-bold">
									{userInfo.displayName}
								</h1>
								<span className="text-textGray text-sm">
									@{userInfo.displayName}
								</span>
							</div>
							<p>Fighting 1 vs 1 only</p>

							<div className="flex gap-4 text-base">
								<div className="flex items-center gap-2">
									<FaLocationDot />
									<span>Los Alamos</span>
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
									<span className="font-bold">100k</span>
									<span className="text-base">Followers</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-bold">100k</span>
									<span className="text-base">
										Followings
									</span>
								</div>
							</div>
						</div>

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
						{activeTab === "posts" && <Feed />}
					</div>
				</div>

				{/* Right Sidebar */}
				<div className="sticky top-20 w-1/3 rounded-md bg-base-300 p-4">
					<h2 className="text-xl font-bold">Trending</h2>
					<ul className="mt-4 space-y-2">
						<li>
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">#Trending1</span>
							</Link>
						</li>
						<li>
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">#Trending2</span>
							</Link>
						</li>
						<li>
							<Link href="#" className="hover:text-blue-500">
								<span className="text-base">#Trending3</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
