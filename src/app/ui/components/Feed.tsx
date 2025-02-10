import { useAppDispatch, useAppSelector } from "@/states/hook";
import PostWidget from "./PostWidget";
import PostForm from "../post/create-form";
import { useEffect } from "react";
import { getPostByUserId } from "@/service/postService";
import { setLoggedInUserPosts, setPagePosts } from "@/states/features/postSlice";
import { useParams } from "next/navigation";

const dummyPosts = [
	{
		id: 1,
		user: { name: "Alice Johnson", avatar: "/avatar.png" },
		tags: ["Realism", "Traditional Art"],
		content: "Loving this Next.js tutorial! 🚀",
		image: "/post.jpeg",
		timestamp: "5 mins ago",
	},
	{
		id: 2,
		user: { name: "Michael Smith", avatar: "/avatar.png" },
		tags: [
			"Semi-Realism",
			"Oil Painting",
			"Traditional Art",
			"Watercolor",
			"Pencil Sketch",
			"Pixel Art",
		],
		content: "Just had an amazing burger 🍔!",
		image: "/post.jpeg",
		timestamp: "30 mins ago",
	},
	{
		id: 3,
		user: { name: "Sophia Brown", avatar: "/avatar.png" },
		tags: ["Fan Art", "Pixel Art"],
		content: "Enjoying the sunset at the beach 🌅",
		image: "/cover-photo.png",
		timestamp: "1 hour ago",
	},
];

export default function Feed() {

	const dispatch = useAppDispatch();
	const posts = useAppSelector(state => state.post.pagePosts);
	const user = useAppSelector(state => state.user.user)!;
	const { id } = useParams();

	useEffect(() => {

		getPostByUserId(user!.userId).then((posts) => {
			// console.log(posts);
			if (id && id === user!.userId) {
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
