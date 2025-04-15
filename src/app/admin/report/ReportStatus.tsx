import { useState } from "react";

export default function ReportStatus({
	reportStatus,
}: {
	reportStatus: string;
}) {
	const [currentStatus, setCurrentStatus] = useState(reportStatus);

	const toggleStatus = () => {
		setCurrentStatus((prev) =>
			prev === "APPROVED" ? "PENDING" : "APPROVED"
		);
	};

	const getStatusProps = (status: string) => {
		switch (status) {
			case "APPROVED":
				return {
					text: "Resolved",
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

	const { text, className } = getStatusProps(currentStatus);

	return (
		<button
			className={`btn btn-sm border-none min-w-[85px] ${className}`}
			onClick={toggleStatus}
		>
			{text}
		</button>
	);
}
