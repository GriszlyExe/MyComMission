import { Post, User } from "@/common/model";
import PostWidget from "./PostWidget";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { useState, useEffect } from "react";

interface PostProps {
    post: Post;
    user: User;
    isChecked: boolean; // Receives selection state from parent
    onSelect: (postId: string, isChecked: boolean) => void;
}

export default function UnboostedPostWidget({ post, user, isChecked, onSelect }: PostProps) {
    const images = [post.picUrl1, post.picUrl2, post.picUrl3, post.picUrl4]
        .filter((imgUrl) => imgUrl !== null && imgUrl !== undefined)
        .map((url) => {
            return { file: undefined, preview: url };
        });

    const [checked, setChecked] = useState(isChecked);

    // Sync with parent state when Select All is used
    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    // Handle checkbox change
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setChecked(checked);
        onSelect(post.postId, checked);
    };

    return (
        <div>
            {/* Image */}
            {images.length > 0 && (
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={images[0].preview || "/path/to/default/image.jpg"}
                        alt=""
                        className="h-full w-full object-cover transition-all duration-300 group-hover:opacity-75 group-hover:brightness-50 cursor-pointer hover:contrast-50"
                        onClick={() =>
                            (
                                document.getElementById(
                                    `post-modal-${post.postId}`
                                ) as HTMLDialogElement
                            )?.showModal()
                        }
                    />
                    {images.length > 1 && (
                        <RiCheckboxMultipleBlankLine className="absolute right-2 top-2 text-3xl text-white" />
                    )}

                    {/* Checkbox */}
                    <input
                        type="checkbox"
                        className="absolute left-2 top-2 text-3xl checkbox border-gray-400 bg-white hover:bg-slate-200"
                        checked={checked}
                        onChange={handleCheckboxChange}
                    />
                </div>
            )}

            {/* Modal */}
            <dialog id={`post-modal-${post.postId}`} className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <PostWidget key={post.postId} post={post} user={user} isInsideModal={true} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
