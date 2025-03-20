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
import { useAppSelector } from "@/states/hook";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function PaymentPage() {
	const userId = useAppSelector((state) => state.user.user!.userId);
	const searchParams = useSearchParams();
	const count = parseInt(searchParams.get("count") || "0", 10);

	const [activeMethod, setActiveMethod] = useState("credit-card");
	const [clientSecret, setClientSecret] = useState("");
	const [qrImageSrc, setQrImageSrc] = useState("");

	const handleMethodClick = (method: string) => {
		setActiveMethod(method);
	};

	const handleCreatePaymentIntent = async () => {
		const res = await createPaymentIntentService(10000);
		console.log("key = ", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
		console.log("res =", res);
		setClientSecret(res.client_secret);
	};

	const getButtonClass = (method: string) =>
		`h-12 w-full rounded-md p-3 text-left ${
			activeMethod === method ? "bg-blue-400 text-white" : "bg-white"
		}`;

	const router = useRouter();

	useEffect(() => {
		if (activeMethod === "promptpay") {
			console.log("START FETCHING");

			// Direct async call within useEffect
			const fetchQR = async () => {
				try {
					const res = await createQRPayment("0817972894", 100);
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
							onClick={() => router.push(`/profile/${userId}`)}
						>
							Cancel Payment
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
									<h2 className="text-xl font-semibold text-gray-700">
										Summary
									</h2>
									<p className="text-lg font-semibold text-gray-700">
										Total:{" "}
										<span className="text-blue-600">
											{count * 100}฿
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
											{count * 100}฿
										</span>
									</p>
								</div>
								{activeMethod === "credit-card" && (
									<button
										className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
										onClick={handleCreatePaymentIntent}
									>
										PROCEED TO PAY
									</button>
								)}
								{activeMethod === "credit-card" &&
									clientSecret && (
										<Elements
											stripe={stripePromise}
											options={{ clientSecret }}
										>
											<CreditCardForm />
										</Elements>
									)}
								{activeMethod === "promptpay" && (
									<PromptPayQR qrImageSrc={qrImageSrc} />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
