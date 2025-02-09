"use client";

import { useAppDispatch, useAppSelector } from "@/states/hook";
import PostForm from "../ui/post/create-form";
import EditPostForm from "../ui/post/edit-form";
import { PostData } from "@/common/interface";
import { getUserInfo } from "@/service/userService";
import { setUser } from "@/states/features/userSlice";
import { setLoggedInUserPosts } from "@/states/features/postSlice";
import { useEffect } from "react";
import { getPostByUserId } from "@/service/postService";

export default function Page() {
	const userId = useAppSelector((state) => state.user.user!.userId);
	const dispatch = useAppDispatch();

	const fetchUserInfo = async () => {
		const user = await getUserInfo(userId);
		console.log(user);
		dispatch(setUser({ user }));
	};

	const fetchPostInfo = async () => {
		const posts = await getPostByUserId(userId);
		console.log(posts);
		dispatch(setLoggedInUserPosts(posts));
	};

	useEffect(() => {
		fetchUserInfo();
        fetchPostInfo();
	}, []);

	return (
		<>
			<div>Hello World!</div>
			<PostForm />
			{/* <EditPostForm post={dummy_data} /> */}
		</>
	);
}
