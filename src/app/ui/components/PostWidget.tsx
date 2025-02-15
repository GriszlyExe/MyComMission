"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import EditPostForm from "../post/edit-form";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Post, User } from "@/common/model";
import Link from "next/link";

interface PostProps {
	post: Post;
	user: User;
}

export default function PostWidget({ post, user }: PostProps) {
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [isHide, setHidden] = useState(false);

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
	};

	return (
		<>
			<div className="card w-full border-2 border-primary bg-white p-4 shadow-xl">
				{/* Post Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="aspect-square">
							<img
								src={user.profileUrl}
								alt="User Avatar"
								width={50}
								height={50}
								className="h-full overflow-hidden rounded-full object-cover"
							/>
						</div>
						<div>
							<Link href={`/profile/${post.artistId}`}>
								<p className="font-semibold">
									{user.displayName}
								</p>
							</Link>
							<p className="text-xs text-gray-500">{`January`}</p>
						</div>
					</div>
					<div className="flex gap-4">
						{/* Eyes off */}
						{isHide && (
							<div
								className="flex cursor-pointer gap-2 hover:text-red-600"
								onClick={() => setHidden(!isHide)}
							>
								<EyeOffIcon className="my-3" />
								<p className="py-3 font-semibold">hidden</p>
							</div>
						)}

						{/* Eyes on */}
						{!isHide && (
							<div
								className="flex cursor-pointer gap-2 hover:text-red-600"
								onClick={() => setHidden(!isHide)}
							>
								<EyeIcon className="my-3" />
								<p className="py-3 font-semibold">public</p>
							</div>
						)}
						{/* Edit Post Button */}
						{/* <button className="btn btn-ghost btn-sm">⋮</button> */}
						<div className="flex gap-6">
							<EyeOffIcon
								className="my-3 cursor-pointer hover:text-red-600"
								onClick={() => setHidden(true)}
							/>
							<EditPostForm
								post={editFormProps}
								postId={post.postId}
							/>
						</div>
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
					<div className="carousel w-full mt-2 h-[380px] rounded-box">
						{" "}
						{images.map((src, index) => {
							// console.log(src);
							return (
								<div
									key={index}
									className="carousel-item h-full w-full overflow-hidden rounded-lg"
								>
									<img
										src={
											src.preview ||
											"/path/to/default/image.jpg"
										}
										alt={`Post Image ${index + 1}`}
										width={800}
										height={400}
										className="rounded-lg"
									/>
								</div>
							);
						})}
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
