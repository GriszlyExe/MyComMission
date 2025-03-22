import React, { useState } from 'react'
import { XSquareIcon, TextSelect, SendIcon, AlarmClockIcon, BadgeAlert } from "lucide-react";
import { OptionButton } from './Button';
import "daisyui";
import { BriefForm } from '@/app/ui/chat/brief/BriefForm';
import { SendArtworkForm } from './SendArtworkForm';
import { PostponeForm } from './PostponeForm';
import { states, isBriefExist } from './commissionState';
import { submitReport } from "@/service/reportService";
import ReportPopup from "@/app/ui/components/ReportPopup";
import { useAppSelector } from '@/stores/hook';
import { getChatroom } from '@/service/chatService';


export default function ChatOptions() {

    const loggedInUserId = useAppSelector(state => state.user.user!.userId);
    const latestCommission = useAppSelector(state => state.commission.latestComission);
    const isCustomer = !latestCommission || (loggedInUserId === latestCommission?.customerId);
    const canCreateBrief = !latestCommission || (latestCommission && latestCommission.state === "FINISHED");
    const isWorking = latestCommission && latestCommission.state === states.working;
    const [isReportOpen, setIsReportOpen] = useState(false);

    const chatRoomId = useAppSelector(state => {
        if (state.chat?.activeRoom) {
            return state.chat.activeRoom.chatRoomId;
        }
        return null;
    });

    const handleReportSubmit = async (reportData: { targetType: string; targetId: string; description: string }) => {
		console.log('clicked')
        if (chatRoomId) {
            console.log("chatroomId: ", chatRoomId);
            const chatroom = await getChatroom(chatRoomId);
            console.log("chatroom: ", chatroom);
            reportData.targetId = chatroom.latestCommission.commissionId;
            await submitReport({ data: reportData });
        } else {
            console.log('chatRoomId does not exist')
        }
	};
    return (
        <div>
            <div className="flex justify-around w-4/5 min-h-12 mb-5">
                {/* @ts-ignore */}
                {isCustomer && <OptionButton onClick={() => document.getElementById("brief-form").showModal()} >
                    {/* <TextSelect size={24} /> <span>{isBriefExist(state) ? "Create Brief" : "Edit Brief"}</span> */}
                    <TextSelect size={24} /> <span>{canCreateBrief ? "Create Brief" : "Edit Brief"}</span>
                </OptionButton>}
                {/* <OptionButton onClick={() => openForm('PostponeForm')}>
                    <AlarmClockIcon size={24} /> <span>Postpone</span>
                </OptionButton> */}

                <OptionButton>
                    <XSquareIcon size={24} /> <span>Reject</span>
                </OptionButton>
                {isWorking && !isCustomer && <OptionButton onClick={() => 
                    // @ts-ignore
                    document.getElementById("SendArtworkForm").showModal()} >
                    <SendIcon size={24} /> <span>Send Artwork</span>
                </OptionButton>}
                <OptionButton onClick={() => setIsReportOpen(true)}>
                    <BadgeAlert size={24} /> <span>Report</span>
                </OptionButton>
                {/* Report Popup */}
                <ReportPopup
                    isOpen={isReportOpen}
                    onClose={() => setIsReportOpen(false)}
                    onSubmit={handleReportSubmit}
                    title="Report This Commission"
                    targetId=""
                    targetType="COMMISSION"
                />

            </div>
            <BriefForm />
            {/* <SendArtworkForm id='SendArtworkForm' /> */}
            {/* <PostponeForm id='PostponeForm' /> */}

        </div>
    )
}

