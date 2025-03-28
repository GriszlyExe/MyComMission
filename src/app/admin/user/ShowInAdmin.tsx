import UserWidgetForAdmin from "./UserWidgetForAdmin";

export default function ShowInAdmin() {
	return (
		<div className="overflow-x-auto border border-purple-700 hidden sm:block">
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th>DisplayName</th>
						<th>Email</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{/* Show all users here */}
					<UserWidgetForAdmin />
					<UserWidgetForAdmin />
					<UserWidgetForAdmin />
					<UserWidgetForAdmin />
					<UserWidgetForAdmin />
				</tbody>
			</table>
		</div>
	);
}
