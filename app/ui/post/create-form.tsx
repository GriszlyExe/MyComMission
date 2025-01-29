'use client'

import { useState } from "react";
import { X } from "lucide-react";
import TagSelector from "./tags";

export default function PostForm() {
    const [isOpen, setIsOpen] = useState(false);

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
                    <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 h-3/4 relative overflow-hidden">
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        {/* Post Form */}
                        <form>
                            <h1 className="text-lg font-bold mb-2 text-center">Create Post</h1>
                            {/* Commission name section*/}
                            <div className="flex my-4">
                                <h2 className="mr-2">Commission name: </h2>
                                <textarea 
                                    className="border flex-grow h-7 resize-none overflow-hidden rounded-md pl-2"
                                    placeholder="Name..."
                                />
                            </div>

                            {/* Commission description section */}
                            <div className="my-4">
                                <h2 className="mr-2 mb-2">Commission description: </h2>
                                <textarea 
                                    className="border flex-grow w-full h-32 resize-none rounded-md pl-3 pt-2"
                                    placeholder="Description..."
                                />
                            </div>

                            {/* Commission tags section */}
                            <div className="flex my-4">
                                <h2 className="mr-1">Tags: </h2>
                                <TagSelector />
                            </div>

                            <div className="flex justify-end mt-2 absolute bottom-0 right-0 mb-4 mr-4">
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
