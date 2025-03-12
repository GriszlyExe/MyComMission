import React, { useState } from 'react'
import { XSquareIcon, TextSelect, SendIcon, AlarmClockIcon } from "lucide-react";
import { OptionButton } from './Button';
import "daisyui";
import { BriefForm } from './BriefForm';
import { SendArtworkForm } from './SendArtworkForm';
import { PostponeForm } from './PostponeForm';
import { states, isBriefExist } from './commissionState';
export default function ChatOptions() {

    const [isBriefCreated, setisBriefCreated] = useState(false);
    const state = states.brief
    const [refresh, setRefresh] = useState(false);
    function openForm(file_name: string) {
        const form = document.getElementById(file_name)
        if (form != null) {
            setRefresh(prev => !prev);
            form.showModal();
        }
    }

    return (
        <div>
            <div className="flex justify-around w-4/5 min-h-12 mb-5">

                <OptionButton onClick={() => openForm('BriefForm')} >
                    <TextSelect size={24} /> <span>{isBriefExist(state) ? "Brief" : "Edit Brief"}</span>
                </OptionButton>
                {/* <OptionButton onClick={() => openForm('PostponeForm')}>
                    <AlarmClockIcon size={24} /> <span>Postpone</span>
                </OptionButton> */}


                <OptionButton>
                    <XSquareIcon size={24} /> <span>Reject</span>
                </OptionButton>
                <OptionButton onClick={() => openForm('SendArtworkForm')} >
                    <SendIcon size={24} /> <span>Send Artwork</span>
                </OptionButton>


            </div>
            <BriefForm id='BriefForm' refresh={refresh}></BriefForm>
            <SendArtworkForm id='SendArtworkForm' />
            {/* <PostponeForm id='PostponeForm' /> */}

        </div>
    )
}

