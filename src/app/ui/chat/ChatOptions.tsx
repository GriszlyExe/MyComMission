import React, { useState } from 'react'
import { XSquareIcon, TextSelect, SendIcon } from "lucide-react";
import { OptionButton } from './Button';
import "daisyui";
import { BriefForm } from '@/app/ui/chat/brief/BriefForm';
import { SendArtworkForm } from './SendArtworkForm';
import { PostponeForm } from './PostponeForm';
import { states, isBriefExist } from './commissionState';
import { useAppSelector } from '@/states/hook';
export default function ChatOptions() {

    const loggedInUserId = useAppSelector(state => state.user.user!.userId);
    const latestCommission = useAppSelector(state => state.commission.latestComission);
    const isCustomer = loggedInUserId === latestCommission?.customerId;
    const canCreateBrief = !latestCommission || (latestCommission && latestCommission.state === "FINISHED");
    const isWorking = latestCommission && latestCommission.state === states.working;

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
                {isWorking && !isCustomer && <OptionButton onClick={() => openForm('SendArtworkForm')} >
                    <SendIcon size={24} /> <span>Send Artwork</span>
                </OptionButton>}


            </div>
            <BriefForm />
            {/* <SendArtworkForm id='SendArtworkForm' /> */}
            {/* <PostponeForm id='PostponeForm' /> */}

        </div>
    )
}

