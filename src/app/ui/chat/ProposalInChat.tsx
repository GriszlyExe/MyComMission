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
import { acceptProposal } from '@/service/commissionService';
import FieldContainer from './InChatFieldContainer';


interface ProposalProp {
    commissionName: string;
    briefDescription: string;
    expectedDate: string;
    proposalPrice: string;
    commercialUse: boolean;
    artistId: string;
    state_: string
}

export default function ProposalInChat({ commissionName, briefDescription, expectedDate, proposalPrice, commercialUse, artistId, state_ }: ProposalProp) {
    const me = useAppSelector((state) => state.user.user!);
    const [userInfo, setUserInfo] = useState<User>(me);
    const userId = useAppSelector((state) => state.user.user?.userId);
    const isArtist = (artistId === userId);

    const deadline = new Date(expectedDate).toLocaleDateString("en-US", {
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

    const latestCommission = useAppSelector(state => {
        console.log(state)
        if (state.chat.activeRoom?.latestCommission) {
            return state.chat.activeRoom.latestCommission;
        }
        return null;
    });

    function acceptProposalBtn() {
        acceptProposal(latestCommission.commissionId);
    }

    return (
        <div>
            <div className="m-auto w-full max-w-lg rounded-md p-2 pb-6 bg-white">
                {/* Header */}
                <h1 className="font-bold text-2xl pl-6 pt-4 mb-6">Proposal</h1>

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
                    <div>
                        <FieldContainer name='Expected Finish Date' value={deadline}/>
                    </div>

                    {/* Price */}
                    <div>
                        <FieldContainer name='Real Price' value={proposalPrice}/>
                    </div>

                    {/* Commercial Use */}
                    <div>
                        <FieldContainer name='Commercial' value={commercialUse ? "For Commercial Use" : "-"}/>
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-x-2 justify-end pr-4'>
                        {/* Edit */}
                        {/* {isArtist && !isCommissionReject(state) && <button className="flex w-1/5 rounded px-4 py-3 text-white bg-gradient-to-r
                                            from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                            type='button'
                            onClick={() => openForm('BriefFormInChat')}
                        >
                            <Edit01Icon className='pr-1' />
                            Edit
                        </button>} */}

                        {/* Accept */}
                        {!isArtist && state_ === "PROPOSAL" && <button className="flex w-1/5 rounded px-4 py-3 text-white bg-gradient-to-r
                                            from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                            type='button'
                            onClick={() => acceptProposalBtn()}
                        >
                            <CheckmarkCircle01Icon className='scale-150 pr-1' />
                            Accept
                        </button>}

                        {/* Reject */}
                        {!isArtist && state_ === "PROPOSAL" && <button className="flex w-1/5 rounded px-4 py-3 text-white bg-gradient-to-r
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
            <ProposalForm id='ProposalForm' refresh={refresh}></ProposalForm>
        </div>
    )
}
