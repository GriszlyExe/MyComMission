import { Download } from 'lucide-react';
import React, { useState } from 'react'
import { states } from './commissionState';
import 'daisyui'
export default function SendArtworkInChat() {
    const [previewPic, setPreviewPic] = useState("/post.jpeg");
    const acceptArtworkId = "accept_artwork"
    function handleAcceptArtwork() {
        document.getElementById(acceptArtworkId)?.close()
        console.log({ state: states.finished });
    }
    return (

        <div className="m-auto w-full max-w-lg rounded-md p-2 pb-6 bg-white flex flex-col items-center gap-4">
            <h1 className='font-bold text-lg'>Artwork</h1>
            <img
                src={previewPic}
                alt="Profile"
                className="h-full w-full overflow-hidden border border-gray-300 object-cover rounded-md"
                width={100}
                height={100}
            />


            <div className='flex flex-row gap-3'>
                <button className="flex rounded px-4 py-3 text-white bg-gradient-to-r
                                                from-green-500 to-green-600 hover:from-green-700 hover:to-green-700"
                    type='button'
                    onClick={() => document.getElementById(acceptArtworkId)?.showModal()}
                >Accept Artwork</button>
                <a className="flex flex-row gap-x-3 rounded px-4 py-3 text-white bg-gradient-to-r
                                                from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                    href={previewPic} download="artwork.jpg">

                    Download Artwork <Download />
                </a>

            </div>
            <dialog id={acceptArtworkId} className="modal modal-bottom sm:modal-middle">

                <div className="modal-box">
                    <h1 className="font-bold text-xl flex justify-center">Do you want to accept this artwork?</h1>
                    <div className='flex flex-row gap-x-3 justify-center m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm-white'>
                        <button className="flex justify-center rounded px-4 py-3 text-white bg-gradient-to-r min-w-40
                                                from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-700"
                            type='button'
                            onClick={() => handleAcceptArtwork()}
                        >Accept</button>
                        <button className="flex justify-center rounded px-4 py-3 text-white bg-gradient-to-r min-w-40
                                                from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-700"
                            type='button'
                            onClick={() => document.getElementById(acceptArtworkId)?.close()}
                        >Cancel</button>
                    </div>
                </div>
            </dialog>

        </div>
    )
}


