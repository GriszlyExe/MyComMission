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
			<div className="hidden lg:block">
				<div className="flex flex-col items-center justify-center gap-5">
					<div className="flex w-3/4 flex-col gap-5">
						{/* <span className="w-full text-2xl font-bold">
							User Managment
						</span> */}
						<div className="flex w-full flex-row items-center gap-5">
                            <div className="w-1/3">
							    <Search placeholder="Search..." />
                            </div>
							<BanTags />
						</div>
						<ShowInAdmin />
						<div className="text-center">
							<PaginationBar currentPage={10} totalPage={20} />
						</div>
					</div>
				</div>
			</div>
			<div className="block lg:hidden">
				<div className="flex flex-col items-center justify-center gap-5">
					{/* <div className="flex w-3/4 flex-col gap-5">
						<div className="flex w-full flex-row items-center gap-3">
							<span className="w-1/3 text-2xl font-bold">
								User Managment
							</span>
							<Search placeholder="Discover your artists..." />
							<span className="text-lg font-semibold">
								Filter:{" "}
							</span>
							<BanTags />
						</div>
						<ShowInAdmin />
						<div className="text-center">
							<PaginationBar currentPage={10} totalPage={20} />
						</div>
					</div> */}
					<div className="flex w-3/4 flex-col gap-3">
						<span className="text-center text-lg font-bold">
							User Managment
						</span>
						<div className="flex w-full flex-row items-center gap-3">
							<div className="w-1/2">
								<Search placeholder="Search..." />
							</div>
							{/* <span className="text-base font-semibold">
								Filter:{" "}
							</span> */}
							<BanTags />
						</div>
						<ShowInAdmin />
						<div className="text-center">
							<PaginationBar currentPage={10} totalPage={20} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
