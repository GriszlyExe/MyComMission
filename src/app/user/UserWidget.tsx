import { User } from "@/common/model";

export default function UserWidget({userInfo}:{userInfo: User}) {
	return (
		<button className="flex flex-row gap-3 rounded-md p-2 hover:bg-gray-200 w-full">
			{/* User profile */}
			<div>
				<div className="aspect-square w-14 overflow-hidden rounded-full bg-gradient-to-b from-violet-500 via-white to-blue-500 p-[4px]">
					<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
						<img
							src={userInfo.profileUrl}
							alt=""
							className="h-full w-full overflow-hidden rounded-full object-cover"
						/>
					</div>
				</div>
			</div>

			{/* UserInfo */}
			<div className="flex flex-col">
				<div className="m-auto w-full text-start">{userInfo.displayName}</div>
				<div className="m-auto text-sm">This is the end</div>
			</div>
		</button>
	);
}
