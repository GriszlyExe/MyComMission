import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostData, FilePreview } from "@/common/interface";
import { postSchema } from "@/common/Schemas";
import TagSelector from "./tags";
import FileUpload from "./file-upload";
import { X } from "lucide-react";
import { createPost } from "@/service/postService";
import { useAppDispatch } from "@/stores/hook";
import { addPost } from "@/stores/features/postSlice";

type FormSchema = yup.InferType<typeof postSchema>;

export default function PostModal({
	isOpen,
	setIsOpen,
	initialData,
	resetForm,
	setDescription, // New: Function to sync description with PostForm
}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	initialData: FormSchema;
	resetForm: () => void; // Accept reset function from PostForm
	setDescription: (value: string) => void; // Accept function to sync description
}) {

    const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: yupResolver(postSchema),
		defaultValues: initialData,
	});

	const onSubmit = async (data: FormSchema) => {
		try {
			const post = await createPost({ data });
			// console.log(post);
			dispatch(addPost(post));
			// setIsOpen(false);
			reset();

			resetForm();
			reset({
				postDescription: "",
				postTags: [],
				images: [],
			});

			setIsOpen(false);
		} catch (err) {}

		// Reset both PostForm and PostModal
	};

	return (
		isOpen && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
				<div className="card mx-4 w-1/2 border-2 border-primary bg-white p-4 shadow-xl">
					<div className="flex justify-between">
						<h1 className="mb-2 text-center text-lg font-bold">
							Create Post
						</h1>
						<X
							className="cursor-pointer"
							onClick={() => setIsOpen(false)}
						/>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Description */}
						<div className="mb-4">
							<h2 className="mb-2 mr-2">
								Commission description:
							</h2>
							<textarea
								className="h-32 w-full flex-grow resize-none rounded-md border pl-3 pt-2"
								placeholder="Description..."
								{...register("postDescription")}
								onChange={(e) => setDescription(e.target.value)} // Sync changes
								value={initialData.postDescription} // Ensure it's in sync
							/>
							{errors.postDescription && (
								<p className="text-sm text-red-500">
									{errors.postDescription.message}
								</p>
							)}
						</div>


						{/* Image Upload */}
						<Controller
							name="images"
							control={control}
							render={({ field }) => (
								<FileUpload
									selectedFiles={field.value!.filter(
										(fpv) =>
											fpv !== null && fpv !== undefined,
									)}
									setSelectedFiles={field.onChange}
								/>
							)}
						/>
						{errors.images && (
							<p className="text-sm text-red-500">
								{errors.images.message}
							</p>
						)}

						{/* Submit Button */}
						<div className="mt-4 flex justify-end">
							<button
								type="submit"
								className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-600 active:bg-black"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
}
