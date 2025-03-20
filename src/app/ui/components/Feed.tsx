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
import BoostedPostWidget from "./BoostedPostWidget"; // Import BoostedPostWidget
import { useEffect, useState } from "react";
import { getPostByUserId, getRandomPosts } from "@/service/postService";
import {
	setLoggedInUserPosts,
	setPagePosts,
} from "@/states/features/postSlice";
import { Post } from "@/common/model";

export default function Feed() {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.post.pagePosts);
	const boostedPostIds = new Set<string>();
	const [boostedPosts, setBoostedPosts] = useState<Post[]>([]);

	// Utility function to shuffle an array
	const shuffleArray = (array: any[]) => {
		return [...array].sort(() => Math.random() - 0.5);
	};

	useEffect(() => {
		getRandomPosts().then((posts) => {
			dispatch(setPagePosts(posts));
		});
		// Fetch boosted posts, in this line you have to fetch another boost posts to prevent duplicate posts
		const allBoostedPosts = posts.filter(post => new Date(post.boostExpiredDate) >= new Date());
		const maxBoostedToShow = Math.max(1, Math.floor(posts.length / 5));
		const selectedBoostedPosts = shuffleArray(allBoostedPosts).slice(0, maxBoostedToShow);
		setBoostedPosts(selectedBoostedPosts)
	}, []);

	// Sort ordinary posts by date
	const sortedPosts = [...posts].sort(
		(post1, post2) =>
			new Date(post2.createdAt).getTime() -
			new Date(post1.createdAt).getTime()
	);

	// Interleave boosted posts
	const interleavedPosts: Post[] = [];
	let boostedIndex = 0;

	for (let i = 0; i < sortedPosts.length; i++) {
		interleavedPosts.push(sortedPosts[i]);

		// Insert a boosted post every 5 ordinary posts (if available)
		if ((i + 1) % 5 === 0 && boostedIndex < boostedPosts.length) {
			const boostedPost = boostedPosts[boostedIndex];

			// Ensure the boosted post is not already in the array
			if (!interleavedPosts.some(post => post.postId === boostedPost.postId)) {
				interleavedPosts.push(boostedPost);
				boostedPostIds.add(boostedPost.postId);
				boostedIndex++;
			}
		}
	}

	// Ensure at least one boosted post appears if total posts < 5
	if (sortedPosts.length < 5 && boostedPosts.length > 0) {
		if (!interleavedPosts.some(post => post.postId === boostedPosts[0].postId)) {
			interleavedPosts.push(boostedPosts[0]);
			boostedPostIds.add(boostedPosts[0].postId);
			boostedIndex++;
		}
	}

	return (
		<div className="flex w-full flex-col items-center space-y-4 p-4">
			{interleavedPosts.map((post, index) =>
				boostedPostIds.has(post.postId) ? (
					<BoostedPostWidget key={post.postId} post={post} user={post.artist} />
					// <div>{index}</div>
				) : (
					<PostWidget key={post.postId} post={post} user={post.artist} />
					// <div>{index}</div>
				)
			)
			}
		</div>
	);
}

