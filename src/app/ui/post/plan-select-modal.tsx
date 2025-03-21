import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PlanSelectModalProps {
	modalId: string;
	selectedPosts: string[];
}

export default function PlanSelectModal({
	modalId,
	selectedPosts,
}: PlanSelectModalProps) {
	const router = useRouter();
	const [selectedPlan, setSelectedPlan] = useState<{
		price: number;
		expiration: string;
	} | null>(null);
	const handleSelect = (plan: { price: number; duration: number }) => {
		const expirationDate = new Date(
			Date.now() + plan.duration * 1000,
		).toLocaleDateString("en-US");
		setSelectedPlan({ price: plan.price, expiration: expirationDate });
	};
	const handleBack = () => {
		(document.getElementById(modalId) as HTMLDialogElement)?.close();
		(
			document.getElementById("postBoost") as HTMLDialogElement
		)?.showModal();
	};
	// Submit function
	const handleSubmit = () => {
		if (selectedPlan) {
			console.log("Selected Plan Details:");
			console.log("Cost:", selectedPlan.price);
			console.log("Selected Posts:", selectedPosts);
			console.log("Expiration Date:", selectedPlan.expiration);
			(document.getElementById(modalId) as HTMLDialogElement)?.close();
			router.push(
				`/home/payment/boosting-payment?count=${selectedPosts.length}`,
			);
		} else {
			console.log("No plan selected.");
		}
	};
	const options = [
		{
			label: "One Day",
			key: "day",
			price: 7,
			duration: 60 * 60 * 24,
		},
		{
			label: "One Week",
			key: "week",
			price: 39,
			duration: 60 * 60 * 24 * 7,
		},
		{
			label: "One Month",
			key: "month",
			price: 169,
			duration: 60 * 60 * 24 * 30,
		},
		{
			label: "One Year",
			key: "year",
			price: 1099,
			duration: 60 * 60 * 24 * 365,
		},
	];
	return (
		<div>
			<dialog id={modalId} className="modal">
				<div className="modal-box w-11/12 max-w-5xl">
					<div>
						<h1 className="mb-4 text-lg font-bold text-black">
							Select Your Plan
						</h1>
						<div className="w-full gap-x-1 rounded-lg text-sm font-medium sm:flex">
							{options.map((item, index) => (
								<div
									className="flex w-full cursor-pointer flex-col items-center rounded-2xl p-3 shadow-md"
									key={`plan-select-${index}`}
								>
									<label className="flex w-full cursor-pointer flex-col items-center p-3">
										<div className="flex flex-row">
											<input
												type="radio"
												name="radio-4"
												className="radio-primary radio"
												onChange={() =>
													handleSelect(item)
												}
											/>
											<span className="ml-2 text-sm font-medium text-black">{`${item.label} Plan`}</span>
										</div>

										<div className="flex w-full flex-col px-4 py-8 text-left">
											<hr className="my-2 w-4/5 border-t border-gray-300" />
											<p className="text-sm text-gray-500">
												Price Per Post
											</p>
											<p>{`THB ${item.price}`}</p>
											<hr className="my-2 w-4/5 border-t border-gray-300" />
											<p className="text-sm text-gray-500">
												Expire Date
											</p>
											<p>
												{new Date(
													Date.now() +
														item.duration * 1000,
												).toLocaleDateString("en-US")}
											</p>
										</div>
									</label>
								</div>
							))}
						</div>
					</div>
					{/* Submit Button */}
					<div className="mt-4 flex justify-end gap-x-4">
						<button
							type="button"
							className="min-w-20 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
							onClick={handleBack}
						>
							Back
						</button>
						<button
							className="min-w-20 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
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
	);
}
