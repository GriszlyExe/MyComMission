"use client";

import PromptPayQR from "@/app/ui/components/PromptpayQR";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { states } from "../ui/chat/commissionState";
import { clipText, formatDate } from "@/utils/helper";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function PaymentPage() {
	
	const router = useRouter();
	const [activeMethod, setActiveMethod] = useState("credit-card");
	const [clientSecret, setClientSecret] = useState("");
	const [stripeId, setStripeId] = useState<string | null>(null);

	const latestCommission = useAppSelector(state => {
		if (!state.chat.activeRoom || !state.chat.activeRoom.latestCommission) {
			return router.back();
		}
		return state.chat.activeRoom.latestCommission;
	});

	const [qrImageSrc, setQrImageSrc] = useState("");

	const handleMethodClick = (method: string) => {
		setActiveMethod(method);
	};

	const handleCreatePaymentIntent = async (amount: number) => {
		const res = await createPaymentIntentService(amount);
		console.log(res);
		const { client_secret, paymentIntent: { id } } = res;
		setStripeId(id);
		setClientSecret(client_secret);
	};

	const getButtonClass = (method: string) =>
		`h-12 w-full rounded-md p-3 text-left ${
			activeMethod === method ? "bg-blue-400 text-white" : "bg-white"
		}`;


	useEffect(() => {
		if (latestCommission!.state !== states.proposal) {
			router.back();
		}
	}, []);

	useEffect(() => {
		if (activeMethod === "promptpay") {
			console.log("START FETCHING");

			// Direct async call within useEffect
			const fetchQR = async () => {
				try {
					const res = await createQRPayment("0817972894", latestCommission!.proposalPrice);
					console.log(res);
					if (res?.signedUrl) {
						setQrImageSrc(res.signedUrl); // Set the QR code image URL
					}
				} catch (error) {
					console.error("Error fetching QR:", error);
				}
			};

			fetchQR(); // Call the function inside useEffect
		}
	}, [activeMethod]);

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
							Cancle Payment
						</button>
					</div>
				</div>
				<div className="flex flex-row gap-5">
					{/* Payment methods */}
					<div className="flex w-1/2 flex-col gap-3">
						<button
							className={getButtonClass("credit-card")}
							onClick={() => handleMethodClick("credit-card")}
						>
							Credit Card
						</button>
						<button
							className={getButtonClass("promptpay")}
							onClick={() => handleMethodClick("promptpay")}
						>
							PromptPay
						</button>
					</div>
					{/* Payment Input */}
					<div className="w-full">
						<div className="flex">
							<div className="m-auto w-full rounded-md bg-white p-6 md:max-w-full">
								<div className="mb-4 flex items-center justify-between border-b pb-2">
									<h2 className="text-3xl font-semibold text-black">
										Summary
									</h2>
									<p className="text-lg font-semibold text-gray-700">
										Total:{" "}
										<span className="text-blue-600">
											{latestCommission!.proposalPrice}฿
										</span>
									</p>
								</div>

								{/* Boosted Posts Breakdown */}
								<div className="mb-4 rounded-md border bg-gray-100 p-4 shadow-sm">
									<div className="flex flex-col gap-1 text-lg text-gray-600">
										<span className="font-bold text-black text-xl">
											Details
										</span>
										<div className="flex flex-row justify-between gap-2 mt-2">
											<span className="font-bold">Name</span>
											<p className="text-md">{latestCommission!.commissionName}</p>
										</div>
										<div className="flex flex-row justify-between gap-2">
											<span className="font-bold">Description</span>
											<p className="text-md">{clipText(latestCommission!.briefDescription, 35)}</p>
										</div>
										<div className="flex flex-row justify-between gap-2">
											<span className="font-bold">Price</span>
											<p className="text-md">{latestCommission!.proposalPrice}฿</p>
										</div>
										<div className="flex flex-row justify-between gap-2">
											<span className="font-bold">Expected Finish Date</span>
											<p className="text-md">{formatDate(latestCommission!.expectedDate)}</p>
										</div>
									</div>
								</div>

								{activeMethod === "credit-card" && <button
									className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
									onClick={() =>
									handleCreatePaymentIntent(
											latestCommission!.proposalPrice,
										)
									}
								>
									PROCEED TO PAY
								</button>}

								{/* <button onClick={handleCreatePaymentIntent}>ClickME!</button> */}
								{activeMethod === "credit-card" && stripeId && clientSecret && (
										<Elements
											stripe={stripePromise}
											options={{ clientSecret }}
										>
										<CreditCardForm
											cmPayload={{ stripeId }}	
										/>
										</Elements>
								)}
								{activeMethod === "promptpay" && (
									<PromptPayQR />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
