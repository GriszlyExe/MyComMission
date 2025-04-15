import { useAppSelector } from "@/stores/hook";
import ReportWidget from "./ReportWidget";
import { Report } from "@/common/model";

// const dummyReports: Report[] = [
// 	{
// 		reportId: "a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6",
// 		reporterId: "11111111-2222-3333-4444-555555555555",
// 		reportType: "POST",
// 		reportStatus: "PENDING",
// 		reportDescription: "Spam or misleading content in post.",
// 		postId: "abcd1234-5678-90ef-ghij-klmnopqrstuv",
// 		commissionId: null,
// 		reporteeId: null,
// 		moderatorResponse: null,
// 		createdAt: new Date(),
// 	},
// 	{
// 		reportId: "123e4567-e89b-12d3-a456-426614174000",
// 		reporterId: "aaaa1111-bbbb-2222-cccc-3333dddd4444",
// 		reportType: "USER",
// 		reportStatus: "IN_REVIEW",
// 		reportDescription: "User sent inappropriate messages.",
// 		reporteeId: "eeee1111-ffff-2222-gggg-3333hhhh4444",
// 		commissionId: null,
// 		postId: null,
// 		moderatorResponse: "User has been warned.",
// 		createdAt: new Date("2025-04-10T12:00:00Z"),
// 	},
// 	{
// 		reportId: "987f6543-21dc-ba98-7654-3210fedcba09",
// 		reporterId: "11223344-5566-7788-99aa-bbccddeeff00",
// 		reportType: "COMMISSION",
// 		reportStatus: "PENDING",
// 		reportDescription: "Commission violates platform policy.",
// 		commissionId: "fedcba98-7654-3210-ba98-112233445566",
// 		reporteeId: null,
// 		postId: null,
// 		moderatorResponse: null,
// 		createdAt: new Date(),
// 	},
// 	{
// 		reportId: "55667788-99aa-bbcc-ddee-112233445566",
// 		reporterId: "99998888-7777-6666-5555-444433332222",
// 		reportType: "GENERAL",
// 		reportStatus: "REJECTED",
// 		reportDescription: "User profile contains offensive bio.",
// 		reporteeId: "aaaa2222-bbbb-3333-cccc-4444dddd5555",
// 		commissionId: null,
// 		postId: null,
// 		moderatorResponse: "No violation found.",
// 		createdAt: new Date(),
// 	},
// 	{
// 		reportId: "11112222-3333-4444-5555-666677778888",
// 		reporterId: "12341234-5678-90ab-cdef-1234567890ab",
// 		reportType: "GENERAL",
// 		reportStatus: "APPROVED",
// 		reportDescription: "Post contains copyrighted content.",
// 		postId: "44443333-2222-1111-0000-999988887777",
// 		commissionId: null,
// 		reporteeId: "deadbeef-dead-beef-dead-beefdeadbeef",
// 		moderatorResponse: null,
// 		createdAt: new Date(),
// 	},
// ];

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
						<ReportWidget report={report} key={`report-${report.reportId}`}/>
					))}
				</tbody>
			</table>
		</div>
	);
}
