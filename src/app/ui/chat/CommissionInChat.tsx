"use client";

import { Commission } from "@/common/model";
import { useAppSelector } from "@/stores/hook";
import { formatDate } from "@/utils/helper";
import { CheckmarkCircle01Icon } from "hugeicons-react";
import { XSquareIcon } from "lucide-react";
import ProposalForm from "@/app/ui/chat/proposal/ProposalForm";

export const states = {
	idle: "IDLE",
	brief: "BRIEF",
	brief_reject: "BRIEF_REJECTED",
	proposal: "PROPOSAL",
	proposal_reject: "PROPOSAL_REJECTED",
	working: "WORKING",
	artwork_shipped: "ARTWORK_SHIPPED",
	artwork_reject: "ARTWORK_REJECTED",
	finished: "FINISHED",
	canceled: "CANCELED",
};

const Button = ({ onClick, Icon, text }: any) => (
	<button
		className="flex w-1/4 rounded bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 text-white hover:from-blue-700 hover:to-purple-700"
		type="button"
		onClick={onClick}
	>
		<Icon className="scale-125 pr-1" />
		{text}
	</button>
);

export default function CommissionInChat({
	commission,
}: {
	commission: Commission;
}) {
	const loggedInUserId = useAppSelector((state) => state.user.user!.userId);
	const isArtist = loggedInUserId == commission.artistId;
	const isBrief = commission.state == "BRIEF";
	const isProposal = commission.state == "PROPOSAL";

	return (
		<div>
			<div className="m-auto mb-2 rounded-md bg-white p-2">
				{/* Details Container */}
				<div className="flex flex-col justify-center gap-5">
					<div className="text-3xl font-bold">
						{commission.commissionName}
					</div>
					<div className="rounded-md border-2 border-gray-600 p-2">
						{commission.briefDescription}
					</div>
					<div className="flex flex-row justify-start">
						<div className="flex w-1/2 flex-col">
							<div className="text-base font-bold">
								{isBrief
									? "Target date"
									: "Expected Finish Date"}
							</div>
							<div className="">
								{formatDate(
									isBrief
										? commission.deadline
										: commission.expectedDate,
								)}
							</div>
						</div>
						<div className="flex w-1/2 flex-col">
							<div className="text-base font-bold">
								{isBrief ? "Budget" : "Price"}
							</div>
							<div className="">
								{isBrief
									? commission.budget
									: commission.proposalPrice}
							</div>
						</div>
					</div>

					<div className="flex flex-row gap-2 p-2">
						<input
							className="relative scale-125"
							type="checkbox"
							checked={commission.commercialUse}
							readOnly
						/>
						<label>Commercial Use</label>
					</div>
				</div>

				<div className="flex justify-end gap-x-2 pr-4">
					{/* Edit */}
					{/* {!isArtist && !isCommissionReject(state) && <button className="flex w-1/5 rounded px-4 py-3 text-white bg-gradient-to-r
                                            from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                            type='button'
                            onClick={() => openForm('BriefFormInChat')}
                        >
                            <Edit01Icon className='pr-1' />
                            Edit
                        </button>} */}

					{/* Accept Brief Section */}
					{isArtist && isBrief && (
						<>
							<Button
								Icon={CheckmarkCircle01Icon}
								text="Accept"
								onClick={() =>
									// @ts-ignore
									document.getElementById(`proposal-form-${commission.commissionId}`)?.showModal()
								}
							/>
							<Button
								Icon={XSquareIcon}
								text="Reject"
								onClick={() =>
									console.log({ state: states.canceled })
								}
							/>
							<ProposalForm />
						</>
					)}

					{/* Accept Brief Section */}
					{!isArtist && isProposal && (
						<>
							<Button
								Icon={CheckmarkCircle01Icon}
								text="Accept"
							/>
							<Button
								Icon={XSquareIcon}
								text="Reject"
								// onClick={handleReject}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
