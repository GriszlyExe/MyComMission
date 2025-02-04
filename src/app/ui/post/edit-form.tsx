'use client';

import { useState } from "react";
import { X } from "lucide-react";
import TagSelector from "./tags";
import FileUpload from "./file-upload";
import { PostData, FilePreview } from "@/common/interface";

interface PostWidgetProps {
    post: PostData;
}

export default function EditPostForm({ post }: PostWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(post.name);
    const [description, setDescription] = useState(post.description);
    const [tags, setTags] = useState<string[]>(post.tags);
    const [price, setPrice] = useState(post.price);
    const [samples, setSamples] = useState<FilePreview[]>(post.samples);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const updatedPost = {
            name,
            description,
            tags,
            price,
            samples
        };

        console.log("Updated Post Data:", updatedPost);

        // Close the modal after submission
        setIsOpen(false);
    };

    return (
        <div>
            {/* Edit Post Button */}
            <button 
                onClick={() => setIsOpen(true)} 
                className="btn btn-primary text-white px-4 py-2 rounded-lg hover:bg-green-500 active:bg-green-400 w-25"
            >
                Edit Post
            </button>

            {/* Post Box Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[460px] h-4/5 relative overflow-auto">
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        {/* Post Form */}
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-lg font-bold mb-2 text-center">Edit Post</h1>
                            
                            {/* Name section */}
                            <div className="flex my-4">
                                <h2 className="mr-2">Commission name: </h2>
                                <textarea 
                                    className="border flex-grow h-7 resize-none overflow-hidden rounded-md pl-2"
                                    placeholder="Name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Description section */}
                            <div className="mb-1">
                                <h2 className="mr-2 mb-2">Commission description: </h2>
                                <textarea 
                                    className="border flex-grow w-full h-32 resize-none rounded-md pl-3 pt-2"
                                    placeholder="Description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            {/* Tags section */}
                            <div className="flex mb-1">
                                <h2 className="mr-1">Tags: </h2>
                                <TagSelector selectedTags={tags} setSelectedTags={setTags} />
                            </div>

                            {/* Price section */}
                            <div className="flex">
                                <h2 className="mr-2">Price: </h2>
                                <input 
                                    className="border h-7 w-40 resize-none overflow-hidden rounded-md pl-1"
                                    placeholder="Price..."
                                    type="number"
                                    min={0}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <h2 className="ml-2">Baht</h2>
                            </div>

                            {/* Sample image section */}
                            <FileUpload selectedFiles={samples} setSelectedFiles={setSamples} />

                            {/* Save Changes Button */}
                            <div className="flex justify-end bottom-0 right-0">
                                <button 
                                    type="submit" 
                                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
