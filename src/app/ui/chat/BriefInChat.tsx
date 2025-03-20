'use client'
import { useAppSelector } from '@/states/hook';
import 'daisyui'
import { Edit01Icon, CheckmarkCircle01Icon } from 'hugeicons-react'
import { XSquareIcon } from 'lucide-react'
import { User } from "@/common/model";
import { useState } from 'react';
import { isCommissionReject as isCommissionReject, states } from './commissionState';
import { BriefForm } from './BriefForm';
import { ProposalForm } from './ProposalForm';
import FieldContainer from './InChatFieldContainer';


interface BriefProp {
    commissionName: string;
    briefDescription: string;
    dueDate: string;
    budget: string;
    commercialUse: boolean;
    artistId: string;
    state: string
}

export default function BriefInChat({ commissionName, briefDescription, dueDate, budget, commercialUse, artistId, state }: BriefProp) {
    const me = useAppSelector((state) => state.user.user!);
    const [userInfo, setUserInfo] = useState<User>(me);
    const userId = useAppSelector((state) => state.user.user?.userId);
    const isArtist = (artistId === userId);

    const deadline = new Date(dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

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
            <div className="m-auto rounded-md p-2 pb-6 bg-white mb-2">
                {/* Header */}
                <h1 className="font-bold text-2xl pl-6 pt-4 mb-10">Brief</h1>

                {/* Details Container */}
                <div className='px-7'>
                    {/* Name */}
                    <div>
                        <FieldContainer name='Name' value={commissionName}/>
                    </div>

                    {/* Details */}
                    <div>
                        <FieldContainer name='Details' value={briefDescription}/>
                    </div>

                    {/* Due Date */}
                    <div className="">
                        <FieldContainer name='Deadline' value={deadline}/>
                    </div>

                    {/* Price */}
                    <div className="">
                        <FieldContainer name='Price' value={budget}/>
                    </div>

                    {/* Commercial Use */}
                    <div className="">
                        <FieldContainer name='Commercial' value={commercialUse ? "For Commercial Use" : "-"}/>
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-x-2 justify-end pr-4'>
                        {/* Edit */}
                        {/* {!isArtist && !isCommissionReject(state) && <button className="flex w-1/5 rounded px-4 py-3 text-white bg-gradient-to-r
                                            from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                            type='button'
                            onClick={() => openForm('BriefFormInChat')}
                        >
                            <Edit01Icon className='pr-1' />
                            Edit
                        </button>} */}

                        {/* Accept */}
                        {isArtist && state === "BRIEF" && <button className="flex w-1/4 rounded px-4 py-3 text-white bg-gradient-to-r
                                            from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                            type='button'
                            onClick={() => openForm('ProposalForm')}
                        >
                            <CheckmarkCircle01Icon className='scale-125 pr-1' />
                            Accept
                        </button>}

                        {/* Reject */}
                        {isArtist && state === "BRIEF" && <button className="flex w-1/4 rounded px-4 py-3 text-white bg-gradient-to-r
                                        from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                            type='button'
                            onClick={() => console.log({ state: states.canceled })}
                        >
                            <XSquareIcon className='scale-x-110 pr-1' />
                            Reject
                        </button>}
                    </div>

                </div>
            </div >
            <BriefForm id='BriefFormInChat' refresh={refresh}></BriefForm>
            <ProposalForm id='ProposalForm' refresh={refresh}></ProposalForm>
        </div>
    )
}
