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

	{
		currentPage > 1 &&
			numberedPageItems.push(
				<Link
					href={"?page=" + 1}
					key="first"
					className="btn join-item btn-sm border-primary bg-secondary text-primary hover:bg-primary hover:text-white"
				>
					«
				</Link>,
				<Link
					href={"?page=" + (currentPage - 1)}
					key="left"
					className="btn join-item btn-sm border-primary bg-secondary text-primary hover:bg-primary hover:text-white"
				>
					‹
				</Link>,
			);
	}
	for (let page = minPage; page <= maxPage; page++) {
		numberedPageItems.push(
			<Link
				href={"?page=" + page}
				key={page}
				className={`btn join-item btn-sm border-primary ${
					currentPage === page
						? "pointer-events-none bg-primary text-white"
						: "bg-secondary text-primary hover:bg-primary hover:text-white"
				}`}
			>
				{page}
			</Link>,
		);
	}
	{
		currentPage < totalPage &&
			numberedPageItems.push(
				<Link
					href={"?page=" + (currentPage + 1)}
					key="right"
					className="btn join-item btn-sm border-primary bg-secondary text-primary hover:bg-primary hover:text-white"
				>
					›
				</Link>,
				<Link
					href={"?page=" + totalPage}
					key="last"
					className="btn join-item btn-sm border-primary bg-secondary text-primary hover:bg-primary hover:text-white"
				>
					»
				</Link>,
			);
	}

	return (
		<>
			<div className="join hidden min-[700px]:block">
				{numberedPageItems}
			</div>
			<div className="join block min-[700px]:hidden">
				{currentPage > 1 && (
					<>
						<Link
							href={"?page=" + 1}
							className="btn join-item btn-sm border-primary bg-secondary text-primary hover:bg-primary hover:text-white"
						>
							«
						</Link>
						<Link
							href={"?page=" + (currentPage - 1)}
							className="btn join-item btn-sm border-primary bg-secondary text-primary hover:bg-primary hover:text-white"
						>
							‹
						</Link>
					</>
				)}
				<button className="btn join-item btn-sm pointer-events-none bg-primary text-white hover:bg-primary">
					Page {currentPage}
				</button>
				{currentPage < totalPage && (
					<>
						<Link
							href={"?page=" + (currentPage + 1)}
							className="btn join-item btn-sm border-primary bg-secondary text-primary hover:bg-primary hover:text-white"
						>
							›
						</Link>
						<Link
							href={"?page=" + totalPage}
							className="btn join-item btn-sm border-primary bg-secondary text-primary hover:bg-primary hover:text-white"
						>
							»
						</Link>
					</>
				)}
			</div>
		</>
	);
}
