import { useAppSelector } from "@/stores/hook";
import ReportWidget from "./ReportWidget";

export default function ShowInAdmin() {
	const reports = useAppSelector((state) => state.admin.paginatedReports);

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
					{reports.map((report) => (
						<ReportWidget
							report={report}
							key={`report-${report.reportId}`}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
