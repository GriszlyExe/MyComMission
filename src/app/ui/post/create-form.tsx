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
import { useRef, useState } from "react";
import PostModal from "./post-modal";
import { Link02Icon } from "hugeicons-react";

type FormSchema = yup.InferType<typeof postSchema>;

export default function PostForm() {

    const textareaRef = useRef(null);
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
		const post = await createPost({ data });
		// console.log(post);
		dispatch(addPost(post));
		reset();
	};

	const closeForm = () => {
		reset();
	};

	return (
		<div>
			<div className="card mx-4 rounded-md border-2 border-primary bg-white p-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1 className="mb-2 text-center text-lg font-bold">
						Create Post
					</h1>

					{/* Description section */}
					<div className="mb-4">
						<h2 className="mb-2 mr-2">Commission description:</h2>
						<textarea
							className="w-full h-auto resize-none rounded-md border px-3 pt-2"
							placeholder="Description..."
							{...register("postDescription")}
						/>
						{errors.postDescription && (
							<p className="text-sm text-red-500">
								{errors.postDescription.message}
							</p>
						)}
					</div>

					{/* Open Modal via Link Icon */}
					<div className="bottom-0 right-0 mt-4 flex justify-end">
						<Link02Icon
							className="mr-4 mt-2 scale-125 cursor-pointer hover:opacity-60"
							onClick={() => setIsOpen(true)}
						/>
						<button
							type="submit"
							className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-600 active:bg-black"
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
					setDescription={(value: string) =>
						setValue("postDescription", value)
					} // Sync modal changes
				/>
			)}
		</div>
	);
}
