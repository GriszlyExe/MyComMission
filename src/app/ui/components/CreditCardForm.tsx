"use client";

import { createPostBoostTransaction } from "@/service/payment";
import { useAppSelector } from "@/stores/hook";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreditCardForm({
	selectedPosts,
	expiration,
	price,
	count,
}: {
	selectedPosts: any;
	expiration: Date;
	price: number;
	count: number;
}) {
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	const loggedInUserId = useAppSelector((state) => state.user.user!.userId);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!stripe || !elements) return;

		setLoading(true);
		setError(null);
		const redirectUrl = async () => {
			const payload = {
				selectedPosts,
				expiration,
				amount: price,
				count,
			};
			await createPostBoostTransaction(payload);
			// console.log(txnRes)
			return `${window.location.origin}/home`;
		};

		const res = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: await redirectUrl(),
			},
		});

		router.push(`/profile/${loggedInUserId}`);
		// console.log("NEXTTTTT")
		if (res.error) {
			setLoading(false);
			console.log(res.error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<p className="text-sm text-gray-600">
				Enter your payment details below:
			</p>

			{/* Secure Card Input from Stripe */}
			<PaymentElement />

			{/* Submit Button */}
			<div className="flex items-center justify-center">
				<button
					type="submit"
					disabled={!stripe || loading}
					className={`w-full rounded px-4 py-3 text-white focus:outline-none ${
						loading
							? "cursor-not-allowed bg-gray-400"
							: "bg-gradient-to-r from-primary-content to-secondary-content hover:from-base-200 hover:to-base-300"
					}`}
				>
					{loading ? "Processing..." : "PAY NOW"}
				</button>
			</div>

			{error && <p className="text-xs text-red-500">{error}</p>}
		</form>
	);
}
