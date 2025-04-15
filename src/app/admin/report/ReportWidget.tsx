'use client'

import ReportModal from "./ReportModal";
import { Report } from "@/common/model";
import ReportStatus from "./ReportStatus";

export default function ReportWidget({ report }: { report: Report }) {

	return (
		<tr>
			<td>
				<div className="flex items-center gap-3">
					<div className="hidden md:block">
						<div className="aspect-square w-14 overflow-hidden rounded-full p-[4px]">
							<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
								<img
									src={report.reporter.profileUrl || "/default-profile-2.png"}
									alt=""
									width={60}
									height={60}
									className="h-full w-full overflow-hidden rounded-full object-cover"
								/>
							</div>
						</div>
					</div>

					<div className="font-bold">
						{report.reporter.displayName}
					</div>
				</div>
			</td>
			<td>
				<div className="items-center">
					<button className="btn btn-sm text-white bg-primary hover:bg-secondary hover:text-primary" type="button" onClick={()=>(document.getElementById(report.reportId) as HTMLDialogElement)!.showModal()}>View</button>
					<dialog id={report.reportId} className="modal modal-middle">
						<ReportModal report={report} />
					</dialog>
					<br />
				</div>
			</td>
			<td>
				<ReportStatus reportStatus={report.reportStatus}/>
			</td>
		</tr>
	);
}
