import React, { useState } from 'react'

interface PlanSelectModalProps {
    modalId: string;
    selectedPosts: string[];
}

export default function PlanSelectModal({ modalId, selectedPosts }: PlanSelectModalProps) {
    const [selectedPlan, setSelectedPlan] = useState<{ price: number, expiration: string } | null>(null);
    const handleSelect = (plan: { price: number, duration: number }) => {
        const expirationDate = new Date(Date.now() + plan.duration * 1000).toLocaleDateString("en-US");
        setSelectedPlan({ price: plan.price, expiration: expirationDate });
    };
    const handleBack = () => {
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
        (document.getElementById("postBoost") as HTMLDialogElement)?.showModal();
    }
    // Submit function
    const handleSubmit = () => {
        if (selectedPlan) {
            console.log("Selected Plan Details:");
            console.log("Cost:", selectedPlan.price);
            console.log("Selected Posts:", selectedPosts);
            console.log("Expiration Date:", selectedPlan.expiration);
            (document.getElementById(modalId) as HTMLDialogElement)?.close();
        } else {
            console.log("No plan selected.");
        }
    };
    const options = [
        {
            label: "Daily", key: 'day', price: 7, duration: 60 * 60 * 24
        },
        { label: "Weekly", key: 'week', price: 39, duration: 60 * 60 * 24 * 7 },
        { label: "Monthly", key: 'month', price: 169, duration: 60 * 60 * 24 * 30 },
        { label: "Yearly", key: 'year', price: 1099, duration: 60 * 60 * 24 * 365 }
    ]
    return (
        <div>
            <dialog id={modalId} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div>
                        <h1 className="mb-4 font-bold text-black text-lg">Select Your Plan</h1>
                        <div className="w-full text-sm font-medium rounded-lg sm:flex gap-x-1">
                            {options.map((item) => (
                                <div className='flex flex-col items-center w-full p-3 cursor-pointer rounded-2xl shadow-md'>
                                    <label className="flex items-center w-full p-3 cursor-pointer">
                                        {/* <input
                                        type="radio"
                                        name="list-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    /> */}
                                        <input key={item.key} type="radio" name="radio-4" className="radio radio-primary"
                                            onChange={() => handleSelect(item)} />
                                        <span className="ml-2 text-sm font-medium text-black">{`${item.label} Plan`}</span>
                                    </label>
                                    <div className="w-full flex flex-col text-left py-8 px-4">
                                        <hr className="w-4/5 border-t border-gray-300 my-2" />
                                        <p className="text-sm text-gray-500">Price Per Post</p>
                                        <p>{`THB ${item.price}`}</p>
                                        <hr className="w-4/5 border-t border-gray-300 my-2" />
                                        <p className="text-sm text-gray-500">Expire Date</p>
                                        <p>{new Date(Date.now() + item.duration * 1000).toLocaleDateString("en-US")}</p>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end mt-4 gap-x-4">
                        <button
                            type='button'
                            className="min-w-20 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button
                            className="min-w-20 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                            onClick={handleSubmit}
                            disabled={!selectedPlan}
                        >
                            Next
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
