'use client'

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import TagSelector from "./tags";
import FileUpload from "./file-upload";
import { PostData, FilePreview } from "@/common/interface";
import { postSchema } from "@/app/(auth)/Schemas";

export default function PostForm() {
    const [isOpen, setIsOpen] = useState(false);

    // React Hook Form setup with correct types
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PostData>({
        resolver: yupResolver(postSchema),
        defaultValues: {
            name: "",
            description: "",
            tags: [],
            price: 0,
            samples: [],
        },
    });

    const onSubmit = (data: PostData) => {
        console.log("Validated Post Data:", data);
        setIsOpen(false);
        reset();
    };

    const closeForm = () => {
        setIsOpen(false);
        reset();
    }

    return (
        <div>
            {/* Button to open post box */}
            <button 
                onClick={() => setIsOpen(true)} 
                className="btn btn-primary text-white px-4 py-2 rounded-lg hover:bg-blue-500 active:bg-blue-400"
            >
                Create Post
            </button>

            {/* Post Box Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[460px] h-4/5 relative overflow-auto">
                        {/* Close Button */}
                        <button 
                            onClick={() => closeForm()} 
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        {/* Post Form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="text-lg font-bold mb-2 text-center">Create Post</h1>
                            
                            {/* Name section */}
                            <div className="flex flex-col my-4">
                                <h2 className="mr-2">Commission name:</h2>
                                <textarea 
                                    className="border flex-grow h-7 resize-none overflow-hidden rounded-md pl-2"
                                    placeholder="Name..."
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            {/* Description section */}
                            <div className="mb-4">
                                <h2 className="mr-2 mb-2">Commission description:</h2>
                                <textarea 
                                    className="border flex-grow w-full h-32 resize-none rounded-md pl-3 pt-2"
                                    placeholder="Description..."
                                    {...register("description")}
                                />
                            </div>

                            {/* Tags section */}
                            <div className="flex flex-col mb-4">
                                <h2 className="mr-1">Tags:</h2>
                                <Controller 
                                    name="tags"
                                    control={control}
                                    render={({ field }) => (
                                        <TagSelector selectedTags={field.value} setSelectedTags={field.onChange} />
                                    )}
                                />
                                {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
                            </div>

                            {/* Price section */}
                            <div className="flex flex-col mb-4">
                                <h2 className="mr-2">Price:</h2>
                                <input 
                                    className="border h-7 w-40 resize-none overflow-hidden rounded-md pl-1"
                                    placeholder="Price..."
                                    type="number"
                                    min={0}
                                    {...register("price")}
                                />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>

                            {/* Sample image section */}
                            <Controller 
                                name="samples"
                                control={control}
                                render={({ field }) => (
                                    <FileUpload selectedFiles={field.value.filter((file): file is FilePreview => file !== undefined)} setSelectedFiles={field.onChange} />
                                )}
                            />
                            {errors.samples && <p className="text-red-500 text-sm">{errors.samples.message}</p>}

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
