'use client'

import { useState } from "react";
import { X } from "lucide-react";
import TagSelector from "./tags";
import FileUpload from "./file-upload";
import { FilePreview } from "./file-upload";

export default function PostForm() {
    const [isOpen, setIsOpen] = useState(false);
    
    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]); // For <TagSelector/>
    const [price, setPrice] = useState("");
    const [samples, setSamples] = useState<FilePreview[]>([]); // For <FileUpload/>

    // Handle form submission
    interface PostData {
        name: string;
        description: string;
        tags: string[];
        price: string;
        samples: FilePreview[];
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create post data
        const postData: PostData = {
            name,
            description,
            tags,
            price,
            samples
        };

        console.log("Post Data:", postData);

        // Close modal after submission
        setName("");
        setDescription("");
        setTags([]);
        setPrice("");
        setSamples([]);
        setIsOpen(false);
    };

    return (
        <div>
            {/* Button to open post box */}
            <button 
                onClick={() => setIsOpen(true)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 active:bg-blue-400"
            >
                Create Post
            </button>

            {/* Post Box Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                            <h1 className="text-lg font-bold mb-2 text-center">Create Post</h1>
                            
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

                            {/* Post Button */}
                            <div className="flex justify-end bottom-0 right-0">
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
