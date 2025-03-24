"use client";

import { Post } from "@/common/model";
import { acceptProposal } from "@/service/commissionService";
import { createPaymentTransaction, createPostBoostTransaction } from "@/service/payment";
import { useAppSelector } from "@/stores/hook";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AdsPayload = {
	selectedPosts: Post[];
	expiration: Date;
	amount: number;
	count: number;
}

type CommissionPayload = {
	stripeId: string
}

interface CreditCardFormProps {
	adsPayload?: AdsPayload;
	cmPayload?: CommissionPayload;
}

export default function CreditCardForm({ adsPayload, cmPayload }: CreditCardFormProps) {
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	const loggedInUserId = useAppSelector((state) => state.user.user!.userId);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/* commission */
	const commission = useAppSelector(state => state.chat.activeRoom!.latestCommission);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!stripe || !elements) return;

		setLoading(true);
		setError(null);
		const redirectUrl = async () => {
			
			/* Post advertisement */
			if (adsPayload) {
				await createPostBoostTransaction(adsPayload);
			} else if (cmPayload) {
				const transactionId = await createPaymentTransaction({ ...commission, stripId: cmPayload.stripeId, paymentMethod: "CREDITCARD" });
				await acceptProposal(commission.commissionId, { transactionId, customerId: commission.customerId });
			}
			
			return `${window.location.origin}/home`;
		};

		await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: await redirectUrl(),
			},
		});

		setLoading(false);
		router.back();
		
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
