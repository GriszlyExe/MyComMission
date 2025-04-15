import { User } from "@/common/model";

export default function UserWidgetSmall({ user }: { user: User }) {

	return (
		<tr>
			<td>
				<div className="flex items-center gap-3">
					<div>
						<div className="font-bold">{user.displayName}</div>
						<div className="text-sm opacity-50">{user.email}</div>
					</div>
				</div>
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
