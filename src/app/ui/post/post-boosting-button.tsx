import React from 'react'
import { GrUpgrade } from 'react-icons/gr'
import BoostModal from './boost-modal'

export default function PostBoostingButton() {
    const openBoostPostModal = (modalId: string) => {
        (
            document.getElementById(
                modalId,
            ) as HTMLDialogElement
        )?.showModal()
    }

    return (
        <div>
            <button
                className="flex gap-x-1 p-3 items-center justify-center border-2 border-green-600 rounded-3xl bg-gradient-to-r from-green-500 to-green-600 py-3 text-white hover:from-green-600 hover:to-green-700"
                type="button"
                onClick={() => openBoostPostModal('postBoost')}
            >
                <GrUpgrade className="w-5 h-5" />
                <span>Boost Posts</span>
            </button>
            <BoostModal modalId="postBoost" />

        </div>
    )
}
