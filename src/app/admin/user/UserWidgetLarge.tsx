import { User } from "@/common/model";
import { banUser, unbanUser } from "@/service/admin";
import { updateBanFlag } from "@/stores/features/adminSlice";
import { useAppDispatch } from "@/stores/hook";

export default function UserWidgetLarge({ user }: { user: User }) {

	const dispatch = useAppDispatch();

	const handleBan = async () => {
		try {
			console.log(`Banning user with ID: ${user.userId}`);
			const { userId, banFlag } = await banUser(user.userId);
			dispatch(updateBanFlag({ userId, banFlag }));
		} catch (error) {
			console.error("Error banning user:", error);	
		}
	}

	const handleUnBan = async () => {
		try {
			console.log(`Unbanning user with ID: ${user.userId}`);	
			const { userId, banFlag } = await unbanUser(user.userId);	
			dispatch(updateBanFlag({ userId, banFlag }));	
		} catch (error) {
			console.error("Error unbanning user:", error);	

		}
	}

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
					<button className="btn btn-sm border-none bg-success text-white hover:bg-green-800" onClick={handleUnBan}>
						Unban
					</button>
				) : (
					<button className="btn btn-sm border-none bg-error text-white hover:bg-pink-800" onClick={handleBan}>
						Ban
					</button>
				)}
			</td>
		</tr>
	);
}
