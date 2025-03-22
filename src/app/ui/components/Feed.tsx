// import { useAppDispatch, useAppSelector } from "@/states/hook";
// import PostWidget from "./PostWidget";
// import PostForm from "../post/create-form";
// import { useEffect } from "react";
// import { getPostByUserId, getRandomPosts } from "@/service/postService";
// import {
// 	setLoggedInUserPosts,
// 	setPagePosts,
// } from "@/states/features/postSlice";
// import BoostedPostWidget from "./BoostedPostWidget";

// export default function Feed() {

// 	const dispatch = useAppDispatch();
// 	const posts = useAppSelector((state) => state.post.pagePosts);

// 	useEffect(() => {
// 		getRandomPosts().then((posts) => {
// 			dispatch(setPagePosts(posts));
// 		});
// 	}, []);




// 	function getRandomInt(max: number) {
// 		return Math.floor(Math.random() * max);
// 	}
// 	return (
// 		<div className="flex w-full flex-col items-center space-y-4 p-4">

// 			{posts &&
// 				[...posts]
// 					.sort(
// 						(post1, post2) =>
// 							new Date(post2.createdAt).getTime() -
// 							new Date(post1.createdAt).getTime(),
// 					)
// 					.map((post) => (
// 						(getRandomInt(5)!==1 )?
// 							<PostWidget
// 								key={post.postId}
// 								post={post}
// 								user={post.artist}
// 							/> :
// 							<BoostedPostWidget
// 								key={post.postId}
// 								post={post}
// 								user={post.artist}
// 							/>
// 					))}
// 		</div>
// 	);
// }
import { useAppDispatch, useAppSelector } from "@/states/hook";
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
} from "@/states/features/postSlice";
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

