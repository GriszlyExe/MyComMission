"use client";

import { useState } from "react";

const availableTags = ["Banned", "Unbanned"];

export default function BanTags() {
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const toggleTag = (tag: string) => {
		setSelectedTag((prev) => (prev === tag ? null : tag));
	};

	return (
		<div className="flex flex-row items-center gap-3">
			<span className="text-lg font-semibold">Filter: </span>
			<div className="flex flex-row gap-2">
				{availableTags.map((tag) => (
					<button
						key={tag}
						onClick={() => toggleTag(tag)}
						className={`rounded-full border px-4 py-2 transition ${
							selectedTag === tag
								? "border-accent bg-primary text-white"
								: "border-secondary bg-white text-primary"
						}`}
					>
						{tag}
					</button>
				))}
			</div>
		</div>
	);
}
