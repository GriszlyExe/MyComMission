"use client";

import { useState } from "react";

const availableTags = ["Banned", "Unbanned"];

export default function BanTags() {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};

	return (
		<div className="flex flex-row items-center gap-3">
			<span className="text-lg font-semibold">Filter: </span>
			<div className="flex flex-row gap-2">
				{availableTags.map((tag) => (
					<button
						key={tag}
						onClick={() => toggleTag(tag)}
						className={`rounded-full border px-4 py-2 ${
							selectedTags.includes(tag)
								? "border-accent bg-primary text-white"
								: "border-gray-300 bg-white text-gray-700"
						}`}
					>
						{tag}
					</button>
				))}
			</div>
		</div>
	);
}
