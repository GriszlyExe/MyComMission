'use client';

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X } from "lucide-react";
import TagSelector from "./tags";
import FileUpload from "./file-upload";
import { PostData, FilePreview } from "@/common/interface";
import { postSchema } from "@/common/Schemas";
import { EditIcon } from "lucide-react";
import { Post } from "@/common/model";
import { updatePostInfoById } from "@/service/postService";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { editPagePost, editUserPost } from "@/states/features/postSlice";
import { useParams } from "next/navigation";

type EditFormSchema = yup.InferType<typeof postSchema>;
interface EditPostProps {
    postId: string;
    post: EditFormSchema;
}

export default function EditPostForm({ postId, post }: EditPostProps) {

    
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const userId = useAppSelector(state => state.user.user!.userId);

    // React Hook Form setup with correct types
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<EditFormSchema>({
        resolver: yupResolver(postSchema),
        defaultValues: {
            ...post,
        }
    });

    // Reset form values when post data changes
    useEffect(() => {
        reset(post)
    }, [post, reset])

    const onSubmit = async (data: EditFormSchema) => {
        
        try {
            console.log("Validated Updated Data:", data);
            const updatedPost = await updatePostInfoById(postId, data);
            // console.log(updatedPost);
            dispatch(editUserPost(updatedPost));
            dispatch(editPagePost(updatedPost));
            // console.log(updatedPost);
            setIsOpen(false);
            reset();
        } catch (err) {
            
        }

    };

    const closeForm = () => {
        setIsOpen(false);
        reset();
    }

    return (
        <div>
            {/* Edit Post Button */}
            {/* <button 
                onClick={() => setIsOpen(true)} 
                className="btn btn-primary text-white px-4 py-2 rounded-lg hover:bg-purple-400 active:bg-purple-500"
            >
                Edit Post
            </button> */}

            <EditIcon className="mt-3 hover:text-green-500 cursor-pointer" onClick={() => setIsOpen(true)}/>


            {/* Post Box Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
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
                            <h1 className="text-lg font-bold mb-2 text-center">Edit Post</h1>
                            
                            {/* Name section */}
                            {/* <div className="flex flex-col my-4">
                                <h2 className="mr-2">Commission name:</h2>
                                <textarea 
                                    className="border flex-grow h-7 resize-none overflow-hidden rounded-md pl-2"
                                    placeholder="Name..."
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div> */}

                            {/* Description section */}
                            <div className="mb-4">
                                <h2 className="mr-2 mb-2">Commission description:</h2>
                                <textarea 
                                    className="border flex-grow w-full h-32 resize-none rounded-md pl-3 pt-2"
                                    placeholder="Description..."
                                    {...register("postDescription")}
                                    {...register("postDescription")}
                                />
                            </div>

                            {/* Tags section */}
                            <div className="flex flex-col mb-4">
                                <h2 className="mr-1">Tags:</h2>
                                <Controller 
                                    name="postTags"
                                    control={control}
                                    render={({ field }) => (
                                        <TagSelector selectedTags={field.value} setSelectedTags={field.onChange} />
                                    )}
                                />
                                {errors.postTags && <p className="text-red-500 text-sm">{errors.postTags.message}</p>}
                            </div>

                            {/* Price section */}
                            {/* <div className="flex flex-col mb-4">
                                <h2 className="mr-2">Price:</h2>
                                <input 
                                    className="border h-7 w-40 resize-none overflow-hidden rounded-md pl-1"
                                    placeholder="Price..."
                                    type="number"
                                    min={0}
                                    {...register("price")}
                                />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div> */}

                            {/* Sample image section */}
                            <Controller 
                                name="images"
                                control={control}
                                render={({ field }) => (
                                    <FileUpload selectedFiles={field.value.filter((file): file is FilePreview => file !== undefined)} setSelectedFiles={field.onChange} />
                                )}
                            />
                            {/* {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>} */}

                            {/* Save Changes Button */}
                            <div className="flex justify-end bottom-0 right-0 mt-3">
                                <button 
                                    type="submit" 
                                    className="bg-purple-600 hover:bg-purple-500 active:bg-purple-600 text-white px-4 py-2 rounded-md"
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