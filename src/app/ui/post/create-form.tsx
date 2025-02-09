"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import * as yup from "yup";
import TagSelector from "./tags";
import FileUpload from "./file-upload";
import { PostData, FilePreview } from "@/common/interface";
import { postSchema } from "@/common/Schemas";
import { createPost } from "@/service/postService";
import { useAppDispatch } from "@/states/hook";
import { addPost } from "@/states/features/postSlice";

// type FormSchema = yup.InferType<typeof >;

export default function PostForm() {

	const [isOpen, setIsOpen] = useState(false);
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
			postName: "",
			postDescription: "",
			postTags: [],
			price: 0,
			samples: [],
		},
	});

	const onSubmit = async (data: PostData) => {
		// console.log("Validated Post Data:", data);
        const post = await createPost({ data });
        console.log(post);
        dispatch(addPost(post));
		setIsOpen(false);
		reset();
	};

	const closeForm = () => {
		setIsOpen(false);
		reset();
	};

	return (
		<div>
			{/* Button to open post box */}
			<button
				onClick={() => setIsOpen(true)}
				className="btn btn-primary rounded-lg px-4 py-2 text-white hover:bg-blue-500 active:bg-blue-400"
			>
				Create Post
			</button>

			{/* Post Box Modal */}
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="relative h-4/5 w-[460px] overflow-auto rounded-lg bg-white p-4 shadow-lg">
						{/* Close Button */}
						<button
							onClick={() => closeForm()}
							className="absolute right-2 top-2 text-gray-600 hover:text-black"
						>
							<X size={20} />
						</button>

						{/* Post Form */}
						<form onSubmit={handleSubmit(onSubmit)}>
							<h1 className="mb-2 text-center text-lg font-bold">
								Create Post
							</h1>

							{/* Name section */}
							<div className="my-4 flex flex-col">
								<h2 className="mr-2">Commission name:</h2>
								<textarea
									className="h-7 flex-grow resize-none overflow-hidden rounded-md border pl-2"
									placeholder="Name..."
									{...register("postName")}
								/>
								{errors.postName && (
									<p className="text-sm text-red-500">
										{errors.postName.message}
									</p>
								)}
							</div>

							{/* Description section */}
							<div className="mb-4">
								<h2 className="mb-2 mr-2">
									Commission description:
								</h2>
								<textarea
									className="h-32 w-full flex-grow resize-none rounded-md border pl-3 pt-2"
									placeholder="Description..."
									{...register("postDescription")}
								/>
							</div>

							{/* Tags section */}
							<div className="mb-4 flex flex-col">
								<h2 className="mr-1">Tags:</h2>
								<Controller
									name="postTags"
									control={control}
									render={({ field }) => (
										<TagSelector
											selectedTags={field.value}
											setSelectedTags={field.onChange}
										/>
									)}
								/>
								{errors.postTags && (
									<p className="text-sm text-red-500">
										{errors.postTags.message}
									</p>
								)}
							</div>

							{/* Price section */}
							<div className="mb-4 flex flex-col">
								<h2 className="mr-2">Price:</h2>
								<input
									className="h-7 w-40 resize-none overflow-hidden rounded-md border pl-1"
									placeholder="Price..."
									type="number"
									min={0}
									{...register("price")}
								/>
								{errors.price && (
									<p className="text-sm text-red-500">
										{errors.price.message}
									</p>
								)}
							</div>

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
							<div className="bottom-0 right-0 flex justify-end">
								<button
									type="submit"
									className="rounded-md bg-blue-600 px-4 py-2 text-white"
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
