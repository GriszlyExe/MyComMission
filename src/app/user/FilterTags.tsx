"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const availableTags = [
	"Realism",
	"Semi-Realism",
    "Chibi",
	"Anime/Manga",
	"Portrait",
	"Fan Art",
	"OC",
	"Digital Art",
	"Traditional Art",
	"Watercolor",
	"Oil Painting",
	"Pencil Sketch",
	"Pixel Art",
];

export default function FilterTags() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const updateURL = useDebouncedCallback(() => {
		const params = new URLSearchParams(searchParams);
		params.delete("tags");
		if (selectedTags.length === 0) {
			params.delete("tags");
		} else {
			params.set("tags", selectedTags.map(tag => tag.replace(/\s+/g, "_")).join("+"));
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	useEffect(() => {
		updateURL();
	}, [selectedTags]);

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};

	return (
		<div className="p-4">
			<h2 className="mb-2 text-lg font-semibold">Tags</h2>
			<div className="flex flex-wrap gap-2">
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
