"use client";

import TopNav from "@/app/ui/global/nav-bar";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { setUser } from "@/stores/features/userSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa6";
import { getUserInfo } from "@/service/userService";
import { User } from "@/common/model";
import FeedProfile from "@/app/ui/components/FeedProfile";
import ArtworkTab from "@/app/ui/components/ArtworkTab";
import SuggestedBar from "@/app/ui/components/SuggestedBar";
import Review from "@/app/ui/components/Review";
import { Message01Icon } from "hugeicons-react";
import { createChatroom } from "@/service/chatService";
import { useRouter } from "next/navigation";
import ReportPopup from "@/app/ui/components/ReportPopup";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { submitReport } from "@/service/reportService";
import { Ellipsis } from "lucide-react";
import BoostModal from "@/app/ui/post/boost-modal";
import PostBoostingButton from "@/app/ui/post/post-boosting-button";
import { formatDate } from "@/utils/helper";

export default function ProfilePage() {
	const me = useAppSelector((state) => state.user.user!);
	const [userInfo, setUserInfo] = useState<User>(me);
	const userId = useAppSelector((state) => state.user.user?.userId);
	const [activeTab, setActiveTab] = useState("posts");
	const [isReportOpen, setIsReportOpen] = useState(false);
	const dispatch = useAppDispatch();

	/* path + routes */
	const { id } = useParams();
	const router = useRouter();

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const fetchUserProfile = async () => {
		const user = await getUserInfo(id as string);
		return user;
	};

	const handleTabCreateChat = async () => {
		if (!userId || !id) {
			console.log("userId or memberId invalid");
			return;
		}

		try {
			const { chatroom } = await createChatroom({
				creatorId: userId,
				memberId: id as string,
			});

			if (!chatroom) {
				throw new Error("Something went wrong!");
			}

			router.push("/chat");
		} catch (error) {
			console.error(error);
		}
	};

	const openBoostPostModal = (modalId: string) => {
		(document.getElementById(modalId) as HTMLDialogElement)?.showModal();
	};

	const handleReportSubmit = async (reportData: {
		targetType: string;
		targetId: string;
		description: string;
	}) => {
		console.log("clicked");
		await submitReport({ data: reportData });
	};

	useEffect(() => {
		fetchUserProfile().then((user) => {
			if (user.userId === userId) {
				dispatch(setUser(user));
			}

			setUserInfo(user);
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
				<div className="mt-20 hidden w-1/4 md:mx-4 md:block">
					<SuggestedBar />
				</div>

				{/* Center Feed */}
				<div className="mt-20 flex w-full max-w-3xl md:mx-4">
					<div className="w-full rounded-md bg-white-bg bg-[#ffffff]">
						{/* Profile */}
						<div className="mb-10 flex flex-row">
							<div>
								{/* User profile */}
								<div className="ml-16 mt-16 aspect-square w-44 overflow-hidden rounded-full p-[4px]">
									<div className="flex h-full w-full justify-center overflow-hidden rounded-full bg-gray-300">
										<img
											src={
												userInfo.profileUrl
													? userInfo.profileUrl
													: "/default-profile-2.png"
											}
											alt=""
											width={112}
											height={112}
											className="h-full w-full overflow-hidden rounded-full object-cover"
										/>
									</div>
								</div>
							</div>

							{/* Information */}
							<div className={"flex w-full flex-row items-center"}>
								{/* Report */}
								{/* {userId !== id && (
									<>
										<div className="relative mt-4">
											<button
												onClick={() =>
													setIsReportOpen(true)
												}
												className="p-3 text-gray-600 hover:text-gray-800"
											>
												<Ellipsis className="absolute right-4 top-0 h-6 w-6" />
											</button>
										</div>
									</>
								)} */}
								{/* end of report */}
								<div className="m-16 flex flex-col gap-2 md:min-w-[370px]">
									<div>
										<h1 className="text-2xl font-bold">
											{`${userInfo.firstName} ${userInfo.lastName}`}
										</h1>
										<span className="text-textGray text-sm font-semibold">
											@{userInfo.displayName}
										</span>
									</div>
									<p className="text-md">{userInfo.description}</p>

									<div className="flex gap-4 text-base">
										<div className="flex items-center gap-2">
											<FaLocationDot />
											<span>{userInfo.location}</span>
										</div>
										<div className="flex items-center gap-2">
											<FaCalendarDay />
											<span>
												Joined{" "}
												{formatDate(userInfo.createdAt)}
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

									{/* Start chat */}
									{userId !== id ? (
										<button
											// className="flex w-1/3 justify-center gap-2 rounded bg-gradient-to-r from-primary-content to-secondary-content py-3 text-white hover:from-base-200 hover:to-base-300"
											className="flex w-1/3 flex-row items-center justify-center gap-2 rounded-md bg-primary p-3 hover:bg-accent"
											type="button"
											onClick={() => {
												handleTabCreateChat();
											}}
										>
											<Message01Icon className="scale-120 font-bold text-white" />
											<span className="text-md text-white">
												Message
											</span>
										</button>
									) : (
										<PostBoostingButton />
									)}
								</div>
							</div>
						</div>
						{/* <BoostModal modalId="postBoost" /> */}
						{/* <PostForm /> */}

						{/* Switch Tab */}
						<div className="flex flex-row justify-center p-2">
							<div className={`w-1/2 pl-5`}>
								<button
									className={`font-bold ${activeTab === "posts" ? "border-b-4 border-primary text-primary" : "text-gray-700"}`}
									onClick={() => handleTabClick("posts")}
								>
									POSTS
								</button>
							</div>
							<div className="w-1/2">
								<button
									className={`font-bold ${activeTab === "artworks" ? "border-b-4 border-primary text-primary" : "text-gray-700"}`}
									onClick={() => handleTabClick("artworks")}
								>
									ARTWORKS
								</button>
							</div>
							<div className="w-1/2">
								<button
									className={`font-bold ${activeTab === "reviews" ? "border-b-4 border-primary text-primary" : "text-gray-700"}`}
									onClick={() => handleTabClick("reviews")}
								>
									REVIEWS
								</button>
							</div>
						</div>

						{/* Report Popup */}
						<ReportPopup
							isOpen={isReportOpen}
							onClose={() => setIsReportOpen(false)}
							onSubmit={handleReportSubmit}
							title="Report This User"
							targetId={id as string}
							targetType="USER"
						/>

						{/* Feed */}
						{activeTab === "posts" && <FeedProfile />}
						{activeTab === "artworks" && <ArtworkTab />}
						{activeTab === "reviews" && <Review />}
					</div>
				</div>
			</div>
		</div>
	);
}
