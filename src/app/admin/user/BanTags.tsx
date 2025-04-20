"use client";

import { useContext, useState } from "react";
import { userReportContext } from "./context";

const availableTags = ["Banned", "Unbanned"];

export default function BanTags() {
	// const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const { banStatus, setBanStatus } = useContext(userReportContext);
	const selectedTag = banStatus ? "Banned" : banStatus === false ? "Unbanned" : null;

	const toggleTag = (tag: string) => {
		if (!setBanStatus) return;
		setBanStatus((prev) => {
			if (prev === null) return tag === "Banned" ? true : false;
			if (prev && tag === "Unbanned") return false;
			if (!prev && tag === "Banned") return true;
			return null; // If both are selected, reset to null
		});
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
