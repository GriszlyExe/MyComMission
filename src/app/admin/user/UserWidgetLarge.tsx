import { User } from "@/common/model";

export default function UserWidgetLarge({ user }: { user: User }) {

	return (
		<tr>
			<td>
				<div className="flex items-center gap-3">
					<div className="">
						<div className="aspect-square w-14 overflow-hidden rounded-full p-[4px]">
							<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
								<img
									src={user.profileUrl || "/default-profile-2.png"}
									alt=""
									width={60}
									height={60}
									className="h-full w-full overflow-hidden rounded-full object-cover"
								/>
							</div>
						</div>
					</div>
					<div>
						<div className="font-bold">{user.displayName}</div>
					</div>
				</div>
			</td>
			<td>
				{user.email}
				<br />
			</td>
			<td>
				{user.banFlag ? (
					<button className="btn btn-sm border-none bg-success text-white hover:bg-green-800">
						Unban
					</button>
				) : (
					<button className="btn btn-sm border-none bg-error text-white hover:bg-pink-800">
						Ban
					</button>
				)}
			</td>
		</tr>
	);
}
