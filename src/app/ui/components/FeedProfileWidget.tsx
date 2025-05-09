import { Post, User } from "@/common/model";
import PostWidget from "./PostWidget";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { HiCheckBadge } from "react-icons/hi2";
interface PostProps {
	post: Post;
	user: User;
}

export default function FeedProfileWidget({ post, user }: PostProps) {
	const images = [post.picUrl1, post.picUrl2, post.picUrl3, post.picUrl4]
		.filter((imgUrl) => imgUrl !== null && imgUrl !== undefined)
		.map((url) => {
			return { file: undefined, preview: url };
		});

	const boostExpiredDate = new Date(post.boostExpiredDate)
	const isPostBoosted = boostExpiredDate > new Date();

	return (
		<div
			className="group cursor-pointer"
			onClick={() =>
				(
					document.getElementById(
						`post-modal-${post.postId}`,
					) as HTMLDialogElement
				)?.showModal()
			}
		>
			{/* Image */}
			{images.length > 0 && <div className="relative h-64 overflow-hidden">
				<img
					src={images[0].preview || "/path/to/default/image.jpg"}
					alt=""
					className="h-full w-full object-cover transition-all duration-300 group-hover:opacity-75 group-hover:brightness-50"
				/>
				{images.length > 1 && (
					<RiCheckboxMultipleBlankLine className="absolute right-2 top-2 text-3xl text-white" />
				)}
				{isPostBoosted && <HiCheckBadge className="absolute left-2 top-2 text-3xl text-white" />}
			</div>}

			{/* Modal */}
			<dialog id={`post-modal-${post.postId}`} className="modal">
				<div className="modal-box w-11/12 max-w-3xl bg-white">
					<PostWidget key={post.postId} post={post} user={user} isInsideModal={false} />
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
}
