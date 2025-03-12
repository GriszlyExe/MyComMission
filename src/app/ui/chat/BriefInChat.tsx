'use client'
import 'daisyui'
import { Edit01Icon, CheckmarkCircle01Icon } from 'hugeicons-react'
import { XSquareIcon } from 'lucide-react'

export default function BriefInChat() {
    return (  
        <div className="m-auto w-full max-w-lg rounded-md p-2 pb-6 bg-white text-black">
            {/* Header */}
            <h1 className="font-bold text-2xl pl-6 pt-4 mb-6">Brief</h1>

            {/* Details Container */}
            <div className='grid gap-y-6'>
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_4fr] px-6">
                    <div className="font-bold pl-6">Name:</div>
                    <div className="break-words sm:whitespace-normal">Monalisa</div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_4fr] px-6">
                    <div className="font-bold pl-6">Details:</div>
                    <div className="break-words sm:whitespace-normal">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum velit architecto id assumenda distinctio libero accusantium sunt maiores laudantium excepturi rem dignissimos debitis, pariatur aperiam? Maxime non libero illo molestiae!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, illo. Consectetur expedita at, quibusdam eveniet sed deserunt aperiam aliquid voluptate, ad labore est earum blanditiis neque. Aut blanditiis aperiam consequatur.
                    </div>
                </div>

                {/* Due Date */}
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_4fr] px-6">
                    <div className="font-bold pl-6">Deadline:</div>
                    <div className="break-words sm:whitespace-normal">12/3/2025</div>
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_4fr] px-6">
                    <div className="font-bold pl-6">Price:</div>
                    <div className="break-words sm:whitespace-normal">350,000 BTCN</div>
                </div>

                {/* Commercial Use */}
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_4fr] px-6">
                    <div className="font-bold pl-6">Commercial:</div>
                    <div className="break-words sm:whitespace-normal">commercial use</div>
                </div>

                {/* Buttons */}
                <div className='flex gap-x-2 justify-end pr-4'>
                    {/* Edit */}
                    <button className="flex w-1/5 rounded px-4 py-3 text-white bg-gradient-to-r
                                        from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                                type='button'
                        >
                        <Edit01Icon className='pr-1'/>
                        Edit
                    </button>

                    {/* Accept */}
                    <button className="flex w-1/5 rounded px-4 py-3 text-white bg-gradient-to-r
                                        from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                                type='button'
                        >
                        <CheckmarkCircle01Icon className='scale-150 pr-1'/>
                        Accept
                    </button>

                    {/* Reject */}
                    <button className="flex w-1/5 rounded px-4 py-3 text-white bg-gradient-to-r
                                    from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                            type='button'
                    >
                        <XSquareIcon className='scale-x-110 pr-1'/>
                        Reject
                    </button>
                </div>

            </div>
        </div>   
    )
}
