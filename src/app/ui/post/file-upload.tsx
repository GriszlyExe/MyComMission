import { useRef } from "react";
import { X } from "lucide-react"; // Import close icon
import { FilePreview } from "@/common/interface";

interface FileUploadProps {
	value: FilePreview[];
	onChange: (files: FilePreview[]) => void;
}

export default function FileUpload({ value, onChange }: FileUploadProps) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files).map((file) => ({
				file,
				preview: URL.createObjectURL(file),
			}));

			if (value.length + newFiles.length > 4) {
				alert("You can upload a maximum of 4 images.");
				return;
			}

			onChange([...value, ...newFiles]); // 🔥 use onChange from react-hook-form
		}
	};

	const removeImage = (index: number) => {
		const updated = value.filter((_, i) => i !== index);
		onChange(updated); // 🔥 use onChange from react-hook-form
	};

	return (
		<div className="flex flex-col items-center">
			<input
				type="file"
				ref={fileInputRef}
				className="hidden"
				accept="image/*"
				onChange={handleFileChange}
				multiple
			/>

			<div
				className={`cursor-pointer rounded-md border-2 border-dashed p-4 text-center ${value.length >= 4 ? "cursor-not-allowed border-gray-300" : "hover:border-blue-500"}`}
				onClick={() => {
					if (value.length < 4) {
						fileInputRef.current?.click();
					}
				}}
			>
				{value.length < 4
					? "Click to upload files (Max: 4)"
					: "Maximum limit reached"}
			</div>

			{value.length > 0 && (
				<div className="mt-4 grid grid-cols-4 gap-4">
					{value.map((file, index) => (
						<div key={index} className="group relative">
							<img
								src={file.preview}
								alt="preview"
								className="h-28 w-28 md:h-36 md:w-36 rounded-md border object-cover shadow-md"
							/>
							<button
								className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white 
                                            opacity-100 md:opacity-0 transition md:group-hover:opacity-100"
								type="button"
								onClick={() => removeImage(index)}
							>
								<X size={14} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
