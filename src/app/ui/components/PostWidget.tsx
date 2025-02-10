"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import EditPostForm from "../post/edit-form";
import { PostData } from "@/common/interface";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Post, User } from "@/common/model";
import clsx from "clsx";

interface PostProps {
	post: Post;
	user: User;
}

export default function PostWidget({ post, user }: PostProps) {
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [isHide, setHidden] = useState(false);
	const [data, setData] = useState<PostData>({
		postDescription: content,
		postTags: tags,
		samples: [
			{
				file: undefined,
				preview: image
			}
		],
	})

	const toggleLike = () => {
		setLiked(!liked);
		setLikes(likes + (liked ? -1 : 1));
	};

	const images = [post.picUrl1, post.picUrl2, post.picUrl3, post.picUrl4]
		.filter((imgUrl) => imgUrl !== null && imgUrl !== undefined)
		.map((url) => {
			return { file: undefined, preview: url };
		});
	
	const editFormProps = {
		postDescription: post.postDescription!,
		images: images!,
		price: post.price!,
		postTags: post.postTags!,
	}

	return (
		<>
			<div className="card w-full max-w-lg border-2 border-primary bg-white p-4 shadow-xl">
				{/* Post Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<img
							src={user.profileUrl}
							alt="User Avatar"
							width={50}
							height={50}
							className="rounded-full"
						/>
						<div>
							<p className="font-semibold">
									{user.displayName}
								</p>
							<p className="text-xs text-gray-500">
								{`January`}
							</p>
						</div>
					</div>
					<div className="flex gap-4">
						{/* Eyes off */}
						{ 	isHide &&
							<div className="flex gap-2 cursor-pointer hover:text-red-600" onClick={() => setHidden(!isHide)}> 
								<EyeOffIcon
									className="my-3"
								/>
								<p className="font-semibold py-3">hidden</p>
							</div>
						}

						{/* Eyes on */}
						{ 	!isHide &&
							<div className="flex gap-2 cursor-pointer hover:text-red-600" onClick={() => setHidden(!isHide)}> 
								<EyeIcon
									className="my-3"
								/>
								<p className="font-semibold py-3">public</p>
						</div>
						}
						{/* Edit Post Button */}
						{/* <button className="btn btn-ghost btn-sm">⋮</button> */}
						<div className="flex gap-6">
							<EyeOffIcon
								className="my-3 cursor-pointer hover:text-red-600"
								onClick={() => setHidden(true)}
							/>
							<EditPostForm post={editFormProps} />
						</div>
					</div>

					{/* Tags */}
					<div className="mt-3 flex flex-wrap gap-1">
						{post.postTags.map((tag) => (
							<div
								key={tag}
								className="mb-1 flex items-center rounded-full bg-neutral px-2 py-1 text-white"
							>
								{tag}
							</div>
						))}
					</div>

					{/* Post Content */}
					<p className="mt-2 text-gray-800">{post.postDescription}</p>
					{/* Display multiple images */}
					{images.length > 0 && (
						<div
							className={`mt-3 grid gap-3 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
						>
							{" "}
							{images.map((src, index) => (
								<div
									key={index}
									className="overflow-hidden rounded-lg"
								>
									<img
										src={
											src.preview || "/path/to/default/image.jpg"
										}
										alt={`Post Image ${index + 1}`}
										width={500}
										height={300}
										className="rounded-lg"
									/>
								</div>
							))}
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
		</>
	);
}
