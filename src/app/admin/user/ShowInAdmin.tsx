import { useAppSelector } from "@/stores/hook";
import UserWidgetLarge from "./UserWidgetLarge";
import UserWidgetSmall from "./UserWidgetSmall";

export default function ShowInAdmin() {

	const users = useAppSelector(state => state.admin.paginatedUsers)

	return (
		<>
			{/* large table */}
			<div className="overflow-x-auto border border-primary-content hidden min-[570px]:block">
				<table className="table">
					<thead>
						<tr>
							<th>Display name</th>
							<th>Email</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{/* all users */}
						{users.map(user => <UserWidgetLarge key={`report-widget-${user.userId}`} user={user} />)}
					</tbody>
				</table>
			</div>
			{/* small table */}
			<div className="overflow-x-auto border border-primary-content block min-[570px]:hidden">
				<table className="table">
					<thead>
						<tr>
							<th>User Info</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{/* all users */}
						{users.map(user => <UserWidgetSmall key={`report-widget-${user.userId}`} user={user} />)}
					</tbody>
				</table>
			</div>
		</>
	);
}
