'use client'

import ReportModal from "./ReportModal";

export default function ReportWidget({ reportId }: { reportId: string }) {
	let isResolved = false;
	return (
		<tr>
			<td>
				<div className="flex items-center gap-3">
					<div className="hidden md:block">
						<div className="aspect-square w-14 overflow-hidden rounded-full p-[4px]">
							<div className="h-full w-full overflow-hidden rounded-full bg-gray-300">
								<img
									src="/avatar.png"
									alt=""
									width={60}
									height={60}
									className="h-full w-full overflow-hidden rounded-full object-cover"
								/>
							</div>
						</div>
					</div>

					<div className="font-bold">
						Hart Hagerty
					</div>
				</div>
			</td>
			<td>
				<div className="items-center">
					<button className="btn btn-sm text-white bg-blue-600" type="button" onClick={()=>(document.getElementById(reportId) as HTMLDialogElement)!.showModal()}>View</button>
					<dialog id={reportId} className="modal modal-middle">
						<ReportModal />
					</dialog>
					<br />
				</div>
			</td>
			<td>
				{isResolved ? (
					<button className="btn btn-sm border-none bg-success text-white hover:bg-green-800">
						Resolved
					</button>
				) : (
					<button className="btn btn-sm border-none bg-error text-white hover:bg-pink-800">
						Pending
					</button>
				)}
			</td>
		</tr>
	);
}
