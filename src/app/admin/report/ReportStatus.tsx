import { approveReport } from "@/service/admin";
import { updateReportStatus } from "@/stores/features/adminSlice";
import { useAppDispatch } from "@/stores/hook";
import { useState } from "react";

export default function ReportStatus({
	reportStatus,
	reportId,
}: {
	reportStatus: string;
	reportId: string;
}) {	

	// const toggleStatus = () => {
	// 	setCurrentStatus((prev) =>
	// 		prev === "APPROVED" ? "PENDING" : "APPROVED"
	// 	);
	// };

	const dispatch = useAppDispatch();

	const handleApproveReport = async () => {
		try {
			const { reportStatus } = await approveReport(reportId);
			dispatch(updateReportStatus({ reportId, reportStatus }));
		} catch (error) {
			console.error("Error approving report:", error);
		}
	}

	const getStatusProps = (status: string) => {
		switch (status) {
			case "APPROVED":
				return {
					text: "Approved",
					className: "bg-success text-white hover:bg-green-800",
				};
			case "PENDING":
				return {
					text: "Pending",
					className: "bg-yellow-500 text-white hover:bg-yellow-600",
				};
			default:
				return {
					text: "Unknown",
					className: "bg-gray-300 text-black",
				};
		}
	};

	const { text, className } = getStatusProps(reportStatus);

	return (
		<button
			// disabled={reportStatus === "APPROVED"}
			className={`btn btn-sm border-none min-w-[85px] ${className}`}
			onClick={reportStatus === "APPROVED" ? handleApproveReport : null}
		>
			{text}
		</button>
	);
}
