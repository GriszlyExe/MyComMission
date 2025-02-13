import { useAppDispatch, useAppSelector } from "@/states/hook";
import PostWidget from "./PostWidget";
import PostForm from "../post/create-form";
import { useEffect } from "react";
import { getPostByUserId } from "@/service/postService";
import { setLoggedInUserPosts, setPagePosts } from "@/states/features/postSlice";
import { useParams } from "next/navigation";

export default function Feed() {

	const dispatch = useAppDispatch();
	const posts = useAppSelector(state => state.post.pagePosts);
	const user = useAppSelector(state => state.user.user)!;
	const { id } = useParams();

	useEffect(() => {

		getPostByUserId(user!.userId).then(({ posts, user }) => {
			// console.log(posts);
			if (id && id === user!.userId) {
				// console.log(posts);
				dispatch(setLoggedInUserPosts(posts));
			}
			dispatch(setPagePosts(posts));
		})

	}, []);

	return (
		<div className="flex flex-col items-center space-y-4 p-4">
			{/* <PostForm /> */}
			{posts.map((post) => (
				<PostWidget key={post.postId} post={post} user={user} />
			))}
		</div>
	);
}
