"use client";

import AdminNav from "@/app/ui/admin/nav-admin";
import Search from "@/app/ui/global/search";
import ShowInAdmin from "./ShowInAdmin";
import PaginationBar from "@/app/ui/components/PaginationBar";
import StatusTags from "./StatusTags";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { getPaginatedReports } from "@/service/admin";
import { setPaginatedReports, updateTotalReportsPage, updateTotalUsersPage } from "@/stores/features/adminSlice";
import { reportContext } from "./context";
import { ReportStatus } from "@/common/model";

export default function ShowUserPage() {

	const searchParams = useSearchParams();
	const page = searchParams.get("page") || "1";
	const searchKey = searchParams.get("search") || null;
	const filterReportStatus = useContext(reportContext).reportStatus;
	
	const [reportStatus, setReportStatus] = useState<ReportStatus | null>(null);
	
	const totalReportsPage = useAppSelector(
		(state) => state.admin.totalReportsPage,
	);

	const dispatch = useAppDispatch();
	const fetchReports = async (page: number) => {
		
		const { reports, totalUsers, totalReports } = await getPaginatedReports({
			page,
			limit: 5,
			search: searchKey || "",
			tag: reportStatus ? reportStatus : null,
		});
		// console.log(`Fetching users for page: ${page}`);
		dispatch(setPaginatedReports(reports));
		dispatch(updateTotalUsersPage(Math.ceil(totalUsers / 5)));
		dispatch(updateTotalReportsPage(Math.ceil(totalReports / 5)));
	};

	useEffect(() => {
		console.log(`Page changed to: ${page}`);
		try {
			// console.log(`Fetching reports for page: ${page}`);
			// console.log(`Search key: ${searchKey}`);
			// console.log(`Filter report status: ${reportStatus}`);
			fetchReports(parseInt(page));
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}, [page, searchKey, reportStatus]);

	return (
		<reportContext.Provider value={{ reportStatus, setReportStatus }}>
			<div className="mb-10 w-full flex-none">
				<AdminNav />
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
						<div className="w-full md:flex md:w-1/3 md:justify-end">
							<StatusTags />
						</div>
					</div>

					{/* Main Content */}
					<ShowInAdmin />

					{/* Pagination */}
					<div className="text-center">
						<PaginationBar
							currentPage={parseInt(page)}
							totalPage={totalReportsPage}
						/>
					</div>
				</div>
			</div>
		</reportContext.Provider>
	);
}
