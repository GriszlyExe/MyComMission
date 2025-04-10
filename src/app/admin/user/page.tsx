import TopNav from "@/app/ui/global/nav-bar";
import Search from "@/app/ui/global/search";
import ShowInAdmin from "./ShowInAdmin";
import PaginationBar from "@/app/ui/components/PaginationBar";
import BanTags from "./BanTags";

export default function ShowUserPage() {
	return (
		<>
			<div className="mb-10 w-full flex-none">
				<TopNav />
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
							<PaginationBar currentPage={20} totalPage={20} />
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
							<PaginationBar currentPage={20} totalPage={20} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
