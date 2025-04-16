"use client";
import { useEffect, useState } from "react";

import AdminNav from "@/app/ui/admin/nav-admin";
import Search from "@/app/ui/global/search";
import ShowInAdmin from "./ShowInAdmin";
import PaginationBar from "@/app/ui/components/PaginationBar";
import BanTags from "./BanTags";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { useSearchParams } from "next/navigation";
import { getPaginatedUsers } from "@/service/admin";
import { setPaginatedUsers, updateTotalReportsPage, updateTotalUsersPage } from "@/stores/features/adminSlice";
import { userReportContext } from "./context";
import { setState } from "@/stores/features/commisionSlice";
import { boolean } from "yup";

export default function ShowUserPage() {

	/* query params */
	const searchParams = useSearchParams();
	const page = searchParams.get("page") || "1";
	const search = searchParams.get("search") || null;

	const dispatch = useAppDispatch();

	const totalUsersPage = useAppSelector(state => state.admin.totalUsersPage);
	const [banStatus, setBanStatus] = useState<boolean | null>(null);

	const fetchUsers = async (page: number) => {
		
		const { users, totalUsers, totalReports } = await getPaginatedUsers({
			page,
			limit: 5,
			search: search || "",
			banFlag: banStatus ? banStatus : null,
		});
		// console.log(`Fetching users for page: ${page}`);
		dispatch(setPaginatedUsers(users));
		dispatch(updateTotalUsersPage(Math.ceil(totalUsers / 5)));
		dispatch(updateTotalReportsPage(Math.ceil(totalReports / 5)));
	}

	useEffect(() => {
		// console.log(`Page changed to: ${page}`);
		// console.log(`Fetching users for page: ${page}`);
		// console.log(`Search query: ${search}`);
		// console.log(`Ban status: ${banStatus}`);
		try {
			fetchUsers(parseInt(page));
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}, [page, search, banStatus]);
	
	return (
		 <userReportContext.Provider value={{ banStatus, setBanStatus }}>
			<div className="mb-10 w-full flex-none">
				<AdminNav />
			</div>
			{/* large layout */}
			<div className="hidden min-[1000px]:block">
				<div className="flex flex-col items-center justify-center gap-5">
					<div className="flex w-3/4 flex-col gap-5">
						<div className="flex w-full flex-row items-center gap-5">
							<span className="w-full text-2xl font-bold">
								User Managment
							</span>
							<div className="w-1/3">
								<Search placeholder="Search..." />
							</div>
							<BanTags />
						</div>
						<ShowInAdmin />
						<div className="text-center">
							<PaginationBar currentPage={parseInt(page)} totalPage={totalUsersPage} />
						</div>
					</div>
				</div>
			</div>
			{/* small layout */}
			<div className="block min-[1000px]:hidden">
				<div className="flex flex-col items-center justify-center gap-5">
					<div className="flex w-3/4 flex-col gap-3">
						<span className="text-center text-2xl font-bold">
							User Managment
						</span>
						{/* large search and filter */}
						<div className="hidden min-[570px]:block">
							<div className="flex w-full flex-row items-center gap-3">
								<div className="w-1/2">
									<Search placeholder="Search..." />
								</div>
								<BanTags />
							</div>
						</div>
						{/* small search and filter */}
						<div className="block min-[570px]:hidden">
							<div className="flex w-full flex-col gap-3">
								<div className="w-full">
									<Search placeholder="Search..." />
								</div>
								<BanTags />
							</div>
						</div>
						<ShowInAdmin />
						<div className="text-center">
							<PaginationBar currentPage={parseInt(page)} totalPage={totalUsersPage} />
						</div>
					</div>
				</div>
			</div>
		</userReportContext.Provider>
	);
}
