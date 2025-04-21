import React, { useState } from "react";
import {
	XSquareIcon,
	TextSelect,
	SendIcon,
	AlarmClockIcon,
	BadgeAlert,
} from "lucide-react";
import { OptionButton } from "./Button";
import "daisyui";
import { BriefForm } from "@/app/ui/chat/brief/BriefForm";
import { SendArtworkForm } from "./SendArtworkForm";
import { PostponeForm } from "./PostponeForm";
import { states, isBriefExist } from "./commissionState";
import { submitReport } from "@/service/reportService";
import ReportPopup from "@/app/ui/components/ReportPopup";
import { useAppSelector } from "@/stores/hook";
import { getChatroom } from "@/service/chatService";

export default function ChatOptions({ closeOption }: { closeOption: any }) {
	const loggedInUserId = useAppSelector((state) => state.user.user!.userId);
	const latestCommission = useAppSelector(
		(state) => state.chat.activeRoom!.latestCommission,
	);

	const isFinished = useAppSelector((state) => {
		const latestCommission = state.chat.activeRoom!.latestCommission;
		return (
			!latestCommission ||
			(latestCommission && latestCommission.state === states.finished)
		);
	});

	const isCustomer = useAppSelector((state) => {
		const latestCommission = state.chat.activeRoom!.latestCommission;
		return isFinished || loggedInUserId === latestCommission?.customerId;
	});

	const isArtist = useAppSelector((state) => {
		const latestCommission = state.chat.activeRoom!.latestCommission;
		return isFinished || loggedInUserId === latestCommission?.artistId;
	});

	const canCreateBrief = isFinished;

	const isBrief = useAppSelector((state) => {
		const latestCommission = state.chat.activeRoom!.latestCommission;
		return latestCommission && latestCommission.state === states.brief;
	});

	const isWorking = useAppSelector((state) => {
		const latestCommission = state.chat.activeRoom!.latestCommission;
		return latestCommission && latestCommission.state === states.working;
	});

	const [isReportOpen, setIsReportOpen] = useState(false);

	const chatRoomId = useAppSelector((state) => {
		if (state.chat?.activeRoom) {
			return state.chat.activeRoom.chatRoomId;
		}
		return null;
	});

	const handleReportSubmit = async (reportData: {
		targetType: string;
		targetId: string;
		description: string;
	}) => {
		console.log("clicked");
		if (chatRoomId) {
			// console.log("chatroomId: ", chatRoomId);
			const chatroom = await getChatroom(chatRoomId);
			const { commissions } = chatroom;
			const latestCommission = commissions.at(-1);
			reportData.targetId = latestCommission.commissionId;
			await submitReport({ data: reportData });
			closeOption();
		} else {
			console.log("chatRoomId does not exist");
		}
	};

	// console.log(`${isWorking} ${isArtist}`);

	return (
		<div>
			<div className="flex flex-row justify-between gap-10">

				{/* @ts-ignore */}
					
				{((isCustomer && isBrief) || isFinished) && (
						<OptionButton
							onClick={() =>
								// @ts-ignore
								document.getElementById("brief-form").showModal()
							}
						>
							<TextSelect size={24} />{" "}
							<span>
								{canCreateBrief ? "Create Brief" : "Edit Brief"}
							</span>
						</OptionButton>
				)}
				{/* <OptionButton onClick={() => openForm('PostponeForm')}>
                    <AlarmClockIcon size={24} /> <span>Postpone</span>
                </OptionButton> */}

				{isWorking && isArtist && (
					<OptionButton
						// @ts-ignore
						onClick={() =>	document.getElementById(`artwork-form-${latestCommission?.commissionId}`,)?.showModal()
						}
					>
						<SendIcon size={24} /> <span>Send Artwork</span>
					</OptionButton>
				)}

				{latestCommission && (
					<OptionButton onClick={() => setIsReportOpen(true)}>
						<BadgeAlert size={24} /> <span>Report</span>
					</OptionButton>
				)}

				{/* Report Popup */}
			</div>
			<ReportPopup
				isOpen={isReportOpen}
				onClose={() => setIsReportOpen(false)}
				onSubmit={handleReportSubmit}
				title="Report This Commission"
				targetId=""
				targetType="COMMISSION"
			/>
			<BriefForm />
			<SendArtworkForm />
			{/* <PostponeForm id='PostponeForm' /> */}
		</div>
	);
}
