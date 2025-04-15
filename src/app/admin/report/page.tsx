"use client";

import TopNav from "@/app/ui/global/nav-bar";
import Search from "@/app/ui/global/search";
import ShowInAdmin from "./ShowInAdmin";
import PaginationBar from "@/app/ui/components/PaginationBar";
import StatusTags from "./StatusTags";

export default function ShowUserPage() {
	return (
		<>
			<div className="mb-10 w-full flex-none">
				<TopNav />
			</div>

			<div className="flex flex-col items-center justify-center gap-5">
				<div className="flex w-11/12 max-w-6xl flex-col gap-5">
					
					{/* Title, Search, and Filter on same row in desktop */}
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-5">
						
						{/* Title */}
						<span className="text-2xl font-bold md:w-1/3 md:whitespace-nowrap">
							Report Management
						</span>

						{/* Search */}
						<div className="w-full md:w-1/3">
							<Search placeholder="Search..." />
						</div>

						{/* Status Filters */}
						<div className="w-full md:w-1/3 md:flex md:justify-end">
							<StatusTags />
						</div>
					</div>

					{/* Main Content */}
					<ShowInAdmin />

					{/* Pagination */}
					<div className="text-center">
						<PaginationBar currentPage={20} totalPage={20} />
					</div>
				</div>
			</div>
		</>
	);
}
