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

type FormSchema = yup.InferType<typeof postSchema>;
import { PostData } from "@/common/interface";

export default function PostForm() {

	// const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

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
            postDescription: "",
            postTags: [],
            samples: [], // Ensure samples is always an array
        },
    });

	const onSubmit = async (data: PostData) => {
        console.log("Submit...")
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
            {/* Button to open post box */}
            {/* <button 
                onClick={() => setIsOpen(true)} 
                className="btn btn-primary text-white px-4 py-2 rounded-lg hover:bg-blue-500 active:bg-blue-400"
            >
                Create Post
            </button> */}

            {/* Post Box Modal */}
            {/* {isOpen && ( */}
                {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> */}
                    <div className="card mx-4 border-2 border-primary bg-white p-4 shadow-xl">
                        {/* Close Button */}
                        {/* <button 
                            onClick={() => closeForm()} 
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            <X size={20} />
                        </button> */}

                        {/* Post Form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="text-lg font-bold mb-2 text-center">Create Post</h1>
                            
                            {/* Name section */}
                            {/* <div className="flex flex-col my-4">
                                <h2 className="mr-2">Commission name:</h2>
                                <textarea 
                                    className="border flex-grow h-7 resize-none overflow-hidden rounded-md pl-2"
                                    placeholder="Name..."
                                    {...register("postName")}
                                />
                                {errors.postName && <p className="text-red-500 text-sm">{errors.postName.message}</p>}
                            </div> */}

                            {/* Description section */}
                            <div className="mb-4">
                                <h2 className="mr-2 mb-2">Commission description:</h2>
                                <textarea 
                                    className="border flex-grow w-full h-32 resize-none rounded-md pl-3 pt-2"
                                    placeholder="Description..."
                                    {...register("postDescription")}
                                />
                                {errors.postDescription && <p className="text-red-500 text-sm">{errors.postDescription.message}</p>}
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
								name="samples"
								control={control}
								render={({ field }) => (
									<FileUpload
										selectedFiles={field.value.filter(
											(file): file is FilePreview =>
												file !== undefined,
										)}
										setSelectedFiles={field.onChange}
									/>
								)}
							/>
							{errors.samples && (
								<p className="text-sm text-red-500">
									{errors.samples.message}
								</p>
							)}

                            {/* Post Button */}
                            <div className="flex justify-end bottom-0 right-0 mt-4">
                                <button 
                                    type="submit" 
                                    className="bg-black hover:bg-gray-600 active:bg-black text-white px-4 py-2 rounded-md"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        /* </div> */
    );
}
