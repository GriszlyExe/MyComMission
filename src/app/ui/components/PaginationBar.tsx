import Link from "next/link";
import { JSX } from "react";

interface PaginationBarProps {
	currentPage: number;
	totalPage: number;
}

export default function PaginationBar({
	currentPage,
	totalPage,
}: PaginationBarProps) {
	const maxPage = Math.min(totalPage, Math.max(currentPage + 4, 10));
	const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

	const numberedPageItems: JSX.Element[] = [];

	for (let page = minPage; page <= maxPage; page++) {
		numberedPageItems.push(
			<Link
				href={"?page=" + page}
				key={page}
				className={`btn join-item border-pink-600 
          ${currentPage === page ? "pointer-events-none bg-pink-600 text-white" 
          : "bg-pink-200 text-pink-600 hover:bg-pink-600 hover:text-white"}`}
			>
				{page}
			</Link>,
		);
	}

	return (
		<>
			<div className="join hidden sm:block">{numberedPageItems}</div>
			<div className="join block sm:hidden">
				{currentPage > 1 && (
					<Link
						href={"?page=" + (currentPage - 1)}
						className="btn join-item bg-pink-200"
					>
						«
					</Link>
				)}
				<button className="btn join-item pointer-events-none bg-pink-600">
					Page {currentPage}
				</button>
				{currentPage < totalPage && (
					<Link
						href={"?page=" + (currentPage + 1)}
						className="btn join-item bg-pink-200"
					>
						»
					</Link>
				)}
			</div>
		</>
	);
}
