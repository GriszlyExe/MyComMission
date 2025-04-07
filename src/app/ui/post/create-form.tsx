"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postSchema } from "@/common/Schemas";
import { createPost } from "@/service/postService";
import { useAppDispatch } from "@/stores/hook";
import { addPost } from "@/stores/features/postSlice";
import TagSelector from "./tags";
import FileUpload from "./file-upload";

type FormSchema = yup.InferType<typeof postSchema>;

export default function PostForm() {

    // const textareaRef = useRef(null);
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
			<div className="card mx-4 rounded-md border shadow-sm bg-white p-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* <h1 className="mb-2 text-center text-lg font-bold">
						Create Post
					</h1> */}

					{/* Description section */}
					<div className="mb-1">
						{/* <h2 className="mb-2 mr-2 ml-1">Commission description:</h2> */}
						<textarea
							className="w-full h-24 resize-none rounded-md border px-3 pt-2"
							placeholder="What's on your mind..."
							{...register("postDescription")}
						/>
						{errors.postDescription && (
							<p className="text-sm text-red-500">
								{errors.postDescription.message}
							</p>
						)}
					</div>

					{/* Tags */}
					<div className="mb-1 flex flex-col">
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

					{/* Image Upload */}
					<Controller
						name="images"
						control={control}
						render={({ field }) => (
							<FileUpload
								value={field.value!.filter(
									(fpv) =>
										fpv !== null && fpv !== undefined,
								)}
								onChange={field.onChange}
							/>
						)}
					/>
					{errors.images && (
						<p className="text-sm text-red-500">
							{errors.images.message}
						</p>
					)}

					{/* Open Modal via Link Icon */}
					<div className="bottom-0 right-0 mt-4 flex flex-row justify-end">
						<button
							type="submit"
							className="rounded-md bg-primary px-4 py-2 text-white hover:bg-accent active:bg-primary"
						>
							Post
						</button>
					</div>
				</form>
			</div>

		</div>
	);
}
