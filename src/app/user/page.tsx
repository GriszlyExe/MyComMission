import SuggestedBar from "../ui/components/SuggestedBar";
import TopNav from "../ui/global/nav-bar";
import Search from "../ui/global/search";
import ShowUsername from "./ShowUsername";

export default function UserPage() {
	return (
		<div className="flex flex-col gap-5">
			<div className="mb-3">
				<TopNav />
			</div>
			<div className="flex flex-row justify-center">
				{/* <SuggestedBar className="w-1/4" /> */}
				<div className="flex w-1/2 flex-col gap-3 p-2">
					<div className="w-full">
						<Search placeholder="Search Display name" />
					</div>

					{/* Show all username match the search */}
					<ShowUsername />
				</div>
			</div>
		</div>
	);
}
