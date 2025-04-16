"use client";

import { useContext } from "react";
import { reportContext } from "./context";
import { ReportStatus } from "@/common/model";

const availableTags: ReportStatus[] = ["PENDING", "APPROVED"];

export default function StatusTags() {

	const { reportStatus, setReportStatus } = useContext(reportContext);

	const toggleTag = (tag: ReportStatus) => {
		if (!setReportStatus) return;
		setReportStatus(prev => prev === tag ? null : tag);
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
							reportStatus === tag
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
