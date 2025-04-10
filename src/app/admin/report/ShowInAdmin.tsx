import ReportWidget from "./ReportWidget";

const fakeUsers = [
	{ displayName: "Alice", email: "alice@email.com", status: "Active" },
	{ displayName: "Bob", email: "bob@email.com", status: "Inactive" },
	{ displayName: "Charlie", email: "charlie@email.com", status: "Pending" },
	{ displayName: "Dana", email: "dana@email.com", status: "Banned" },
	{ displayName: "Eve", email: "eve@email.com", status: "Active" },
];

export default function ShowInAdmin() {
	return (
		<div className="overflow-x-auto border border-primary-content">
			<table className="table">
				<thead>
					<tr>
						{/* Only show these columns on large screens */}
						<th>User</th>
						<th>Details</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{fakeUsers.map((user, idx) => (
						<ReportWidget reportId={idx.toString()} />
					))}
				</tbody>
			</table>
		</div>
	);
}
