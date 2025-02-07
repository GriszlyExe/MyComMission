"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import EditPostForm from "../post/edit-form";
import { PostData } from "@/common/interface";
import { EyeOffIcon } from "lucide-react";

interface PostProps {
	user: {
		name: string;
		avatar: string;
	};
	tags: string[];
	content: string;
	image?: string;
	timestamp: string;
}

export default function Post({
	user,
	tags,
	content,
	image,
	timestamp,
}: PostProps) {
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [hidden, setHidden] = useState(false);

	const dummy_data: PostData = {
		name: user.name,
		description: content,
		tags: tags,
		price: 0,
		samples: [
			{
				file: undefined,
				preview: image,
			},
		],
	};

	const toggleLike = () => {
		setLiked(!liked);
		setLikes(likes + (liked ? -1 : 1));
	};

	// const post: Post = {

	// }

	return (
		<>
			{!hidden && (
				<div className="card w-full max-w-lg border-2 border-primary bg-white p-4 shadow-xl">
					{/* Post Header */}
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<Image
								src={user.avatar}
								alt="User Avatar"
								width={40}
								height={40}
								className="rounded-md"
							/>
							<div>
								<p className="font-semibold">{user.name}</p>
								<p className="text-xs text-gray-500">
									{timestamp}
								</p>
							</div>
						</div>
						{/* Edit Post Button */}
						{/* <button className="btn btn-ghost btn-sm">⋮</button> */}
						<div className="flex gap-6">
							<EyeOffIcon
								className="my-3 cursor-pointer hover:text-red-600"
								onClick={() => setHidden(true)}
							/>
							<EditPostForm post={dummy_data} />
						</div>
					</div>

					{/* Tags */}
					<div className="mt-3 flex flex-wrap gap-1">
						{tags.map((tag) => (
							<div
								key={tag}
								className="mb-1 flex items-center rounded-full bg-neutral px-2 py-1 text-white"
							>
								{tag}
							</div>
						))}
					</div>

					{/* Post Content */}
					<p className="mt-2 text-gray-800">{content}</p>
					{image && (
						<div className="mt-3 overflow-hidden rounded-lg">
							<Image
								src={image}
								alt="Post Image"
								width={500}
								height={300}
								className="rounded-lg"
							/>
						</div>
					)}

					{/* Post Actions */}
					<div className="mt-3 flex items-center space-x-4">
						<button
							className="btn btn-ghost btn-sm flex items-center space-x-2"
							onClick={toggleLike}
						>
							{liked ? (
								<FaHeart className="h-5 w-5 text-red-500" />
							) : (
								<FaRegHeart className="h-5 w-5 text-gray-600" />
							)}
							<span>{likes}</span>
						</button>
						<button className="btn btn-ghost btn-sm flex items-center space-x-2">
							<FaRegCommentDots className="h-5 w-5 text-gray-600" />
							<span>Comment</span>
						</button>
					</div>
				</div>
			)}
		</>
	);
}
