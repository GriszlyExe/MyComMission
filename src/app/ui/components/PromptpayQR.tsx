import {
	Elements,
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntentService } from "@/service/stripe";
import { useState } from "react";

export default function PromptPayQR() {
	const handleCreatePaymentIntent = async () => {
		//     const res = await createPaymentIntentService(10000)
		// 	console.log("key = ",process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
		//     console.log("res =",res)
		//     setClientSecret(res.client_secret)
	};

	return (
		<div className="flex flex-col h-[400px] items-center justify-center gap-6">
			<div className="flex h-full flex-col items-center border-2 border-gray-500">
				<img src="/qr_logo_head.png" alt="PromptPay Logo" width={300} />
				<img src="/QR_test.png" alt="PromptPay QR Code" width={175} />
			</div>
			<button
					type="submit"
					className="text-white px-4 py-3 font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
				>
					COMPLETE
				</button>
		</div>
	);
}
