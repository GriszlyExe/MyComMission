import { useAppDispatch, useAppSelector } from "@/states/hook";
import PostWidget from "./PostWidget";
import PostForm from "../post/create-form";
import { useEffect } from "react";
import { getPostByUserId, getRandomPosts } from "@/service/postService";
import {
	setLoggedInUserPosts,
	setPagePosts,
} from "@/states/features/postSlice";
import BoostedPostWidget from "./BoostedPostWidget";

export default function Feed() {

	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.post.pagePosts);

	useEffect(() => {
		getRandomPosts().then((posts) => {
			dispatch(setPagePosts(posts));
		});
	}, []);




	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
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
						(getRandomInt(5)!==1 )?
							<PostWidget
								key={post.postId}
								post={post}
								user={post.artist}
							/> :
							<BoostedPostWidget
								key={post.postId}
								post={post}
								user={post.artist}
							/>
					))}
		</div>
	);
}
// import { useAppDispatch, useAppSelector } from "@/states/hook";
// import PostWidget from "./PostWidget";
// import BoostedPostWidget from "./BoostedPostWidget"; // Import BoostedPostWidget
// import { useEffect, useState } from "react";
// import { getPostByUserId, getRandomPosts } from "@/service/postService";
// import {
// 	setLoggedInUserPosts,
// 	setPagePosts,
// } from "@/states/features/postSlice";
// import { Post } from "@/common/model";

// export default function Feed() {
// 	const dispatch = useAppDispatch();
// 	const posts = useAppSelector((state) => state.post.pagePosts);
// 	const [boostedPosts, setBoostedPosts] = useState<Post[]>([]);

// 	// Utility function to shuffle an array
// 	const shuffleArray = (array: any[]) => {
// 		return [...array].sort(() => Math.random() - 0.5);
// 	};

// 	useEffect(() => {
// 		getRandomPosts().then((posts) => {
// 			dispatch(setPagePosts(posts));
// 		});
// 		// Fetch boosted posts
// 		const shuffledPosts = shuffleArray(posts);
// 		const maxBoostedToShow = Math.max(1, Math.floor(posts.length / 5));
// 		const simulatedBoostedPosts = shuffledPosts.slice(0, maxBoostedToShow);
// 		setBoostedPosts(simulatedBoostedPosts);
// 	}, []);

// 	// Sort ordinary posts by date
// 	const sortedPosts = [...posts].sort(
// 		(post1, post2) =>
// 			new Date(post2.createdAt).getTime() -
// 			new Date(post1.createdAt).getTime()
// 	);

// 	// Calculate how many boosted posts should appear (1 per 5 ordinary posts)
// 	const maxBoostedToShow = Math.max(1, Math.floor(sortedPosts.length / 5));

// 	// Shuffle boosted posts and take only the needed amount
// 	const selectedBoostedPosts = shuffleArray(boostedPosts).slice(0, maxBoostedToShow);

// 	// Interleave boosted posts
// 	const interleavedPosts: any[] = [];
// 	let boostedIndex = 0;

// 	for (let i = 0; i < sortedPosts.length; i++) {
// 		interleavedPosts.push(sortedPosts[i]);

// 		// Insert a boosted post every 5 ordinary posts (if available)
// 		if ((i + 1) % 5 === 0 && boostedIndex < selectedBoostedPosts.length) {
// 			interleavedPosts.push(selectedBoostedPosts[boostedIndex]);
// 			boostedIndex++;
// 		}
// 	}

// 	// Ensure at least one boosted post appears if total posts < 5
// 	if (sortedPosts.length < 5 && selectedBoostedPosts.length > 0) {
// 		interleavedPosts.push(selectedBoostedPosts[0]);
// 	}

// 	return (
// 		<div className="flex w-full flex-col items-center space-y-4 p-4">
// 			{interleavedPosts.map((post, index) =>
// 				post.isBoosted ? (
// 					<BoostedPostWidget key={post.postId} post={post} user={post.artist} />
// 				) : (
// 					<PostWidget key={post.postId} post={post} user={post.artist} />
// 				)
// 			)}
// 		</div>
// 	);
// }

