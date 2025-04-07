"use client";

import { useAppDispatch, useAppSelector } from "@/stores/hook";
import PostForm from "../ui/post/create-form";
import { setLoggedInUserPosts } from "@/stores/features/postSlice";
import { useEffect } from "react";
import { getPostByUserId } from "@/service/postService";
import Feed from "../ui/components/Feed";
import SuggestedBar from "@/app/ui/components/SuggestedBar";
import Search from "../ui/global/search";
import FilterTags from "../user/FilterTags";

export default function Page() {
	const userId = useAppSelector((state) => state.user.user!.userId);
	const dispatch = useAppDispatch();

	const fetchPostInfo = async () => {
		const { posts } = await getPostByUserId(userId);
		dispatch(setLoggedInUserPosts(posts));
	};

	useEffect(() => {
		fetchPostInfo();
	}, []);

	return (
		<div className="flex flex-col md:flex-row justify-between gap-4">
			{/* SuggestedBar - Top on mobile, Left on desktop */}
			<div className="order-2 md:order-none w-full md:w-1/4 border">
				<SuggestedBar />
			</div>

			{/* Feed - Middle content */}
			<div className="order-3 md:order-none w-full md:w-5/12 flex flex-col gap-3 bg-white rounded-md py-4">
				<PostForm />
				<Feed />
			</div>

			{/* Search + FilterTags - Top on mobile, Right on desktop */}
			<div className="order-1 md:order-none w-full md:w-1/4">
				<div className="sticky top-0 md:static">
					<Search placeholder="Search Post" />
					<FilterTags />
				</div>
			</div>
		</div>
	);
}
