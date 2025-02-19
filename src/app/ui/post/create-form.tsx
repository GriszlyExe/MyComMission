"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TagSelector from "./tags";
import FileUpload from "./file-upload";
import { FilePreview } from "@/common/interface";
import { postSchema } from "@/common/Schemas";
import { createPost } from "@/service/postService";
import { useAppDispatch } from "@/states/hook";
import { addPost } from "@/states/features/postSlice";
import { PostData } from "@/common/interface";
import { useState } from "react";
import PostModal from "./post-modal";
import { Link02Icon } from "hugeicons-react";


type FormSchema = yup.InferType<typeof postSchema>;

export default function PostForm() {

	const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    // React Hook Form setup with correct types
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: yupResolver(postSchema),
        defaultValues: {
            postDescription: "",
            postTags: [],
            images: [], // Ensure samples is always an array
        },
    });

	const onSubmit = async (data: FormSchema) => {
        // console.log("Submit...")
		// console.log("Validated Post Data:", data);
        const post = await createPost({ data });
        console.log(post);
        dispatch(addPost(post));
		// setIsOpen(false);
		reset();
	};

	const closeForm = () => {
		// setIsOpen(false);
		reset();
	};

/*     useEffect(() => {
        console.log("Errors:", errors);
    }, [errors]); */

    return (
        <div>
            <div className="card mx-4 border-2 border-primary bg-white p-4 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-lg font-bold mb-2 text-center">Create Post</h1>
                    
                    {/* Description section */}
                    <div className="mb-4">
                        <h2 className="mr-2 mb-2">Commission description:</h2>
                        <textarea 
                            className="border flex-grow w-full h-32 resize-none rounded-md px-3 pt-2"
                            placeholder="Description..."
                            {...register("postDescription")}
                        />
                        {errors.postDescription && <p className="text-red-500 text-sm">{errors.postDescription.message}</p>}
                    </div>

                    {/* Open Modal via Link Icon */}
                    <div className="flex justify-end bottom-0 right-0 mt-4">
                        <Link02Icon 
                            className="mt-2 mr-4 scale-125 hover:opacity-60 cursor-pointer" 
                            onClick={() => setIsOpen(true)}
                        />
                        <button 
                            type="submit" 
                            className="bg-black hover:bg-gray-600 active:bg-black text-white px-4 py-2 rounded-md"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>

            {/* PostModal with shared form state */}
            {isOpen && (
                <PostModal 
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen} 
                    initialData={{
                        postDescription: watch("postDescription"), // Get the current value
                        postTags: [],
                        images: [],
                    }}
                    resetForm={reset} // Pass reset function to modal
                    setDescription={(value: string) => setValue("postDescription", value)} // Sync modal changes
                />
            )}
        </div>
    );
}
