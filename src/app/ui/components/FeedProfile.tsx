import FeedProfileWidget from "./FeedProfileWidget";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { useEffect } from "react";
import { getPostByUserId } from "@/service/postService";
import {
	setLoggedInUserPosts,
	setPagePosts,
} from "@/states/features/postSlice";
import { useParams } from "next/navigation";

export default function FeedProfile() {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.post.pagePosts);
	const user = useAppSelector((state) => state.user.user)!;
	const { id } = useParams() as { id: string };

	useEffect(() => {
		getPostByUserId(id).then(({ posts, user }) => {
			if (id && id === user!.userId) {
				dispatch(setLoggedInUserPosts(posts));
			}
			dispatch(setPagePosts(posts));
		});
	}, []);

	return (
		<div className="grid grid-cols-3 gap-2 p-4">
			{posts
				.sort(
					(post1, post2) =>
						new Date(post2.createdAt).getTime() -
						new Date(post1.createdAt).getTime(),
				)
				.map((post) => (
					<FeedProfileWidget
						key={post.postId}
						post={post}
						user={user}
					/>
				))}
		</div>
	);
}
