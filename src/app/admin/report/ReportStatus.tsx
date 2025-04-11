export default function ReportStatus({
	reportStatus,
}: {
	reportStatus: string;
}) {
	return (
		<>
			{reportStatus == "APPROVED" && (
				<button className="btn btn-sm border-none bg-success text-white hover:bg-green-800">
					Approved
				</button>
			)}

			{reportStatus == "PENDING" && (
				<button className="btn btn-sm border-none bg-yellow-500 text-white hover:bg-yellow-600">
					Pending
				</button>
			)}

			{reportStatus == "IN_REVIEW" && (
				<button className="btn btn-sm border-none bg-blue-500 text-white hover:bg-blue-600">
					In Review
				</button>
			)}

			{reportStatus == "REJECTED" && (
				<button className="btn btn-sm border-none bg-error text-white hover:bg-red-800">
					Rejected
				</button>
			)}
		</>
	);
}
