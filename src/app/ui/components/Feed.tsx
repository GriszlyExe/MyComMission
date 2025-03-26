import { useAppDispatch, useAppSelector } from "@/stores/hook";
import PostWidget from "./PostWidget";
import { useEffect, useState } from "react";
import {
	getPostByUserId,
	getRandomBoostedPosts,
	getRandomNonBoostedPosts,
	getRandomPosts,
	searchAndFilterPosts,
} from "@/service/postService";
import {
	setLoggedInUserPosts,
	setPagePosts,
} from "@/stores/features/postSlice";
import { useSearchParams } from "next/navigation";
import { Post } from "@/common/model";

export default function Feed() {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.post.pagePosts);
	const searchParams = useSearchParams().get("search");
	const tagsParams = useSearchParams().get("tags");
	const boostedPostIds = new Set<string>();
	const [boostedPosts, setBoostedPosts] = useState<Post[]>([]);

	const shuffleArray = (array: any[]) => {
		return [...array].sort(() => Math.random() - 0.5);
	};

	// Use to search and filter post
	useEffect(() => {

		if (searchParams || tagsParams) {
			searchAndFilterPosts(searchParams!, tagsParams!).then((posts) => {
				dispatch(setPagePosts(posts));
			});
		} else {
			getRandomPosts().then((posts) => {
				dispatch(setPagePosts(posts));

				// After setting non-boosted posts, fetch random boosted posts
				getRandomBoostedPosts().then((boostedPosts) => {

					const postIds = new Set(posts.map((post: { postId: string; }) => post.postId))
					// console.log(postIds);
					const maxBoostedToShow = Math.max(
						1,
						Math.floor(posts.length / 5),
					);
					const selectedBoostedPosts = shuffleArray(boostedPosts).slice(
						0,
						maxBoostedToShow,
					).filter(post => !postIds.has(post.postId));
					console.log("Filtered Boosted Posts:", selectedBoostedPosts.map(p => p.postId));
					console.log("Normal Posts:", posts.map(p => p.postId));

					setBoostedPosts(selectedBoostedPosts);

				});
			});
			// getRandomPosts().then((posts) => {
			// 	dispatch(setPagePosts(posts));

			// 	// After setting non-boosted posts, fetch random boosted posts
			// 	getRandomBoostedPosts().then((boostedPosts) => {
			// 		const maxBoostedToShow = Math.max(1, Math.floor(posts.length / 5));

			// 		// Convert posts array to a Set of IDs (assuming each post has a unique 'id')
			// 		const postIds = new Set(posts.map((post: { id: any; }) => post.id));
			// 		console.log(postIds);
			// 		const selectedBoostedPosts = shuffleArray(boostedPosts)
			// 			.filter(post => !postIds.has(post.id)) // Correct filtering
			// 			.slice(0, maxBoostedToShow);

			// 		setBoostedPosts(selectedBoostedPosts);
			// 	});
			// });
		}
	}, [searchParams, tagsParams]);

	const sortedPosts = [...posts].sort(
		(post1, post2) =>
			new Date(post2.createdAt).getTime() -
			new Date(post1.createdAt).getTime()
	);

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

	if (sortedPosts.length < 5 && boostedPosts.length > 0) {
		if (!interleavedPosts.some(post => post.postId === boostedPosts[0].postId)) {
			interleavedPosts.push(boostedPosts[0]);
			boostedPostIds.add(boostedPosts[0].postId);
			boostedIndex++;
		}
	}
	const uniqueInterleavedPosts = Array.from(
		new Map(interleavedPosts.map(post => [post.postId, post])).values()
	);
	return (
		<div className="flex w-full flex-col items-center space-y-4 p-4">
			{uniqueInterleavedPosts.map((post) =>
				<PostWidget key={post.postId} post={post} user={post.artist} isSponsored={boostedPostIds.has(post.postId)} />
			)}
		</div>
	);
}

