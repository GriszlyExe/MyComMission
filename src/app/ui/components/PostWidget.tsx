"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import EditPostForm from "../post/edit-form";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Post, User } from "@/common/model";
import Link from "next/link";
import { string } from "yup";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { hidePost } from "@/service/postService";
import { editPagePost, editUserPost } from "@/states/features/postSlice";
import ImageModal from "./ImageModal";

interface PostProps {
	post: Post;
	user: User;
	isInsideModal?: boolean; // New prop to prevent pop-up in modal
}

export default function PostWidget({ post, user, isInsideModal = false }: PostProps) {

	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const userId = useAppSelector((state) => state.user.user!.userId);
	const isHide = post.isHide;
	const dispatch = useAppDispatch();

	const toggleLike = () => {
		setLiked(!liked);
		setLikes(likes + (liked ? -1 : 1));
	};
	
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const images = [post.picUrl1, post.picUrl2, post.picUrl3, post.picUrl4]
		.filter((imgUrl) => imgUrl !== null && imgUrl !== undefined)
		.map((url) => {
			return { file: undefined, preview: url };
		});

	const toggleHidePost = async () => {
		try {
			await hidePost(post.postId, !isHide);
			dispatch(editUserPost({ ...post, isHide: !isHide }));
			dispatch(editPagePost({ ...post, isHide: !isHide }));
		} catch (err) {
			
		}
	}

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
								src={user ? user.profileUrl : "/default-profile-2.png"}
								alt="User Avatar"
								width={50}
								height={50}
								className="h-full overflow-hidden rounded-full object-cover"
							/>
						</div>
						<div>
							<Link href={`/profile/${post.artistId}`}>
								<p className="font-semibold">
									{user ? user.displayName : "display name"}
								</p>
							</Link>
							<p className="text-xs text-gray-500">{`January`}</p>
						</div>
					</div>
					{(userId === post.artistId) && <div className="flex gap-4">
						{/* Eyes off */}
						{isHide && (
							<div
								className="flex cursor-pointer gap-2 hover:text-red-600"
								onClick={toggleHidePost}
							>
								<EyeOffIcon className="my-3" />
								<p className="py-3 font-semibold">hidden</p>
							</div>
						)}

						{/* Eyes on */}
						{!isHide && (
							<div
								className="flex cursor-pointer gap-2 hover:text-red-600"
								onClick={toggleHidePost}
							>
								<EyeIcon className="my-3" />
								<p className="py-3 font-semibold">public</p>
							</div>
						)}
						{userId == post.artistId && (
							<div className="flex gap-6">
								<EditPostForm
									post={editFormProps}
									postId={post.postId}
								/>
							</div>
						)}
					</div>}
				</div>

				{/* Tags */}
				<div className="mt-3 flex flex-wrap gap-1">
					{post.postTags && post.postTags.map((tag) => (
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
										className="rounded-lg w-full h-full object-cover"
										onClick={() => {
											if(!isInsideModal){ // Prevent modal inside modal
												setSelectedImage(src.preview);
											}
											console.log("click")}
										}
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

				{/* Image Modal */}
				{selectedImage && <ImageModal imageSrc={selectedImage} onClose={() => setSelectedImage(null)} />}
			</div>
		</>
	);
}
