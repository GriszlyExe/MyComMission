"use client";

import PromptPayQR from "@/app/ui/components/PromptpayQR";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreditCardForm from "@/app/ui/components/CreditCardForm";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntentService, createQRPayment } from "@/service/payment";
import { useAppSelector } from "@/stores/hook";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function PaymentPage() {

	const userId = useAppSelector((state) => state.user.user!.userId);
	const searchParams = useSearchParams();
	const [clientSecret, setClientSecret] = useState("");

	const handleCreatePaymentIntent = async (amount: number) => {
		const res = await createPaymentIntentService(amount);
		const { client_secret, paymentIntent: { id } } = res;
		setClientSecret(client_secret);
	};

	const router = useRouter();
	const posts = searchParams.get("posts");
	const selectedPosts = posts ? JSON.parse(decodeURIComponent(posts as string)) : [];
	const count = selectedPosts.length;
	const selectedPlan = searchParams.get("selectedPlan");
	const option = selectedPlan ? JSON.parse(decodeURIComponent(selectedPlan)) : [];

	return (
		<div className="m-auto w-3/4">
			<div className="m-auto flex w-full flex-col gap-5">
				<div className="flex flex-row justify-between">
					<div className="my-auto text-3xl text-gray-700">
						Payment methods
					</div>
					<div>
						<button
							className="btn btn-error text-white"
							onClick={() => router.back()}
						>
							Cancel Payment
						</button>
					</div>
				</div>
				<div className="flex flex-row gap-5">
					{/* Payment methods */}
					<div className="flex w-1/2 flex-col gap-3">
						<button className="h-12 w-full rounded-md p-3 text-left bg-blue-400 text-white">
							Credit Card
						</button>
					</div>
					{/* Payment Input */}
					<div className="w-full">
						<div className="flex">
							<div className="m-auto w-full rounded-md bg-white p-6 md:max-w-full">
								<div className="mb-4 flex items-center justify-between border-b pb-2">
									<h2 className="text-3xl font-semibold text-gray-700">
										Summary
									</h2>
									<p className="text-lg font-semibold text-gray-700">
										Total:{" "}
										<span className="text-blue-600">
											{count * option.price}฿
										</span>
									</p>
								</div>

								{/* Boosted Posts Breakdown */}
								<div className="mb-4 rounded-md border bg-gray-100 p-4 shadow-sm">
									<p className="text-lg text-gray-600">
										Boosted Posts{" "}
										<span className="font-bold">
											x{count}
										</span>{" "}
										<span className="float-right">
											{count * option.price}฿
										</span>
									</p>
								</div>
								
								<button
									className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
									onClick={() =>
									handleCreatePaymentIntent(
											count * option.price,
										)
									}
								>
									PROCEED TO PAY
								</button>
								
								{clientSecret && (
									<Elements
										stripe={stripePromise}
										options={{ clientSecret }}
									>
										<CreditCardForm
											adsPayload={{
												selectedPosts,
												expiration: option.expiration,
												amount: option.price,
												count,
											}}
										/>
									</Elements>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
