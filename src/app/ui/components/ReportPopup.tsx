import clsx from "clsx";
import React, { useState, useEffect } from "react";

interface ReportPopupProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (reportData: {
		targetType: string;
		targetId: string;
		description: string;
	}) => void;
	title: string;
	targetId: string;
	targetType: string;
}

export default function ReportPopup({
	isOpen,
	onClose,
	onSubmit,
	title,
	targetType,
	targetId,
}: ReportPopupProps) {

	const [description, setDescription] = useState("");

	const handleSubmit = () => {
		if (description && description.trim() != "") {
			onSubmit({ targetType, targetId, description });
			setDescription("");
			onClose();
		}
	};

	const handleCancel = () => {
		setDescription("");
		onClose();
	};

	return (
		<div className={clsx("fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70", {
            "hidden": !isOpen,
        })}>
			<div className="relative w-1/2 max-w-[700px] rounded-lg bg-white p-6 shadow-lg">
				<h2 className="mb-4 text-xl font-semibold">{title}</h2>{" "}

				{/* Description Input */}
				<label className="mb-2 block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="mb-4 w-full rounded-md border border-gray-300 p-2"
					placeholder="Describe the issue..."
				/>
				{/* Action Buttons */}
				<div className="flex justify-end space-x-2">
					<button
						onClick={handleCancel}
						className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="rounded bg-primary px-4 py-2 text-white hover:bg-accent hover:text-secondary"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
