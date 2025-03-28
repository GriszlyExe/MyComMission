import { Post, User } from "@/common/model";
import PostWidget from "../components/PostWidget";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { InfoIcon } from "lucide-react";
import { formatDate } from "@/utils/helper";
import { cancelBoostedPostById } from "@/service/postService";
interface BoostedPostProps {
    post: Post;
    user: User;
}

export default function ManageBoostedPost({ post, user }: BoostedPostProps) {
    const images = [post.picUrl1, post.picUrl2, post.picUrl3, post.picUrl4]
        .filter((imgUrl) => imgUrl !== null && imgUrl !== undefined)
        .map((url) => {
            return { file: undefined, preview: url };
        });
    const expiredDate = formatDate(post.boostExpiredDate);
    const openCancelModal = (open: boolean) => {
        if (open) {
            (document.getElementById(
                `cancel-boosting-modal-${post.postId}`
            ) as HTMLDialogElement
            )?.showModal()
        } else {
            (document.getElementById(
                `cancel-boosting-modal-${post.postId}`
            ) as HTMLDialogElement
            )?.close()
        }
    }
    const handleCancelling = () => {
        // handle cancelling post here
        const postId = post.postId
        console.log("boostedpost =",postId);
        cancelBoostedPostById(postId)
    }
    return (
        <div>
            <div className="grid grid-cols-2 gap-2 shadow-md p-2 rounded-md"
            >
                {/* Image */}
                {images.length > 0 && (
                    <div className="">

                        <div className="p-1 relative h-32 w-32 sm:h-48 sm:w-48 overflow-hidden hover:contrast-75"
                            onClick={() =>
                                (
                                    document.getElementById(
                                        `post-modal-${post.postId}`
                                    ) as HTMLDialogElement
                                )?.showModal()
                            }>
                            <img
                                src={images[0].preview || "/path/to/default/image.jpg"}
                                alt="boosted post image"
                                // className="h-full w-full object-cover transition-all duration-300 group-hover:opacity-75 group-hover:brightness-50 cursor-pointer"
                                className="w-auto h-auto sm:h-full sm:w-full overflow-hidden rounded-sm border border-gray-300 object-cover"
                            />
                            <InfoIcon className="absolute right-2 top-2 text-3xl text-white" />
                        </div>
                    </div>
                )}
                <div className="flex flex-col items-center gap-y-3">
                    <button type="button"
                        className="text-sm sm:text-base bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 p-3 rounded-3xl"
                        onClick={() => openCancelModal(true)}>
                        <p className="text-blue-700">Cancel Boost</p>
                    </button>
                    <div className="text-sm sm:text-base">{`Expires ${expiredDate}`}</div>
                </div>

            </div>

            {/* Modal */}
            <dialog id={`post-modal-${post.postId}`} className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <PostWidget key={post.postId} post={post} user={user} isInsideModal={true} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            {/* Cancel Boosting Modal */}
            <dialog id={`cancel-boosting-modal-${post.postId}`} className="modal">
                <div className="modal-box w-3/4 max-w-3xl p-6 flex flex-col justify-center items-center text-center">
                    <h2 className="font-bold text-lg">Are you sure you want to cancel boosting this post?</h2>
                    <p className="text-gray-700 mt-2">This action cannot be undone, and no refund is provided.</p>

                    <div className="flex flex-wrap gap-4 mt-4 w-full justify-center">
                        <button
                            type="button"
                            className="w-full sm:w-auto min-w-24 bg-gradient-to-r from-blue-500 to-blue-600 hover:to-blue-700 p-2 rounded-lg text-white transition duration-300 ease-in-out"
                            onClick={() => { handleCancelling(); openCancelModal(false) }}
                        >
                            Confirm
                        </button>
                        <button
                            type="button"
                            className="w-full sm:w-auto min-w-24 bg-gray-300 hover:bg-gray-400 p-2 rounded-lg text-gray-800 transition duration-300 ease-in-out"
                            onClick={() => openCancelModal(false)}
                        >
                            Back
                        </button>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
