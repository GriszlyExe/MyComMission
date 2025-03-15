import { useAppDispatch, useAppSelector } from "@/states/hook";
import PostWidget from "./PostWidget";
import PostForm from "../post/create-form";
import { useEffect } from "react";
import { getPostByUserId, getRandomPosts } from "@/service/postService";
import {
	setLoggedInUserPosts,
	setPagePosts,
} from "@/states/features/postSlice";

export default function Feed() {

	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.post.pagePosts);

	useEffect(() => {
		getRandomPosts().then((posts) => {
			dispatch(setPagePosts(posts));
		});
	}, []);

	return (
		<div className="flex w-full flex-col items-center space-y-4 p-4">

			{posts &&
				[...posts]
					.sort(
						(post1, post2) =>
							new Date(post2.createdAt).getTime() -
							new Date(post1.createdAt).getTime(),
					)
					.map((post) => (
						<PostWidget
							key={post.postId}
							post={post}
							user={post.artist}
						/>
					))}
		</div>
	);
}
