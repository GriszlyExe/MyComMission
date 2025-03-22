"use client";

import { useAppDispatch, useAppSelector } from "@/states/hook";
import PostForm from "../ui/post/create-form";
import { setLoggedInUserPosts } from "@/states/features/postSlice";
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
		const { posts, artist } = await getPostByUserId(userId);
		dispatch(setLoggedInUserPosts(posts));
	};

	useEffect(() => {
		fetchPostInfo();
	}, []);

	return (
		<>
			<div className="md:hidden mb-4">
				<Search placeholder="Search Post" />
				<FilterTags />
			</div>
			<div className="flex flex-row justify-between">
				<div className="w-1/4 border hidden md:block">
					<SuggestedBar />
				</div>
				<div className="flex w-full md:w-5/12 flex-col gap-3 bg-white rounded-md py-4">
					<PostForm />
					<Feed />
				</div>
				<div className="hidden md:block w-1/4">
					<Search placeholder="Search Post" />
					<FilterTags />
				</div>
			</div>
		</>
	);
}
