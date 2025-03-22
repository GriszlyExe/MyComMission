import { useAppDispatch, useAppSelector } from "@/stores/hook";
import PostWidget from "./PostWidget";
import PostForm from "../post/create-form";
import { useEffect } from "react";
import {
	getPostByUserId,
	getRandomPosts,
	searchAndFilterPosts,
} from "@/service/postService";
import {
	setLoggedInUserPosts,
	setPagePosts,
} from "@/stores/features/postSlice";
import { useSearchParams } from "next/navigation";

export default function Feed() {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.post.pagePosts);
	const searchParams = useSearchParams().get("search");
	const tagsParams = useSearchParams().get("tags");

	// Use to search and filter post
	useEffect(() => {
		if (searchParams || tagsParams) {
			searchAndFilterPosts(searchParams!, tagsParams!).then((posts) => {
				dispatch(setPagePosts(posts));
			});
		} else {
			getRandomPosts().then((posts) => {
				dispatch(setPagePosts(posts));
			});
		}
	}, [searchParams, tagsParams]);

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

