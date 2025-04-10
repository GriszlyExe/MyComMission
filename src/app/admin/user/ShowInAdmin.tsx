import UserWidgetLarge from "./UserWidgetLarge";
import UserWidgetSmall from "./UserWidgetSmall";

export default function ShowInAdmin() {
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
						<UserWidgetLarge />
						<UserWidgetLarge />
						<UserWidgetLarge />
						<UserWidgetLarge />
						<UserWidgetLarge />
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
						<UserWidgetSmall />
						<UserWidgetSmall />
						<UserWidgetSmall />
						<UserWidgetSmall />
						<UserWidgetSmall />
					</tbody>
				</table>
			</div>
		</>
	);
}
