"use client";

import PromptPayQR from "@/app/ui/components/PromptpayQR";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreditCardForm from "@/app/ui/components/CreditCardForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import { createPaymentIntentService } from "@/service/stripe";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


export default function PaymentPage() {
	const [activeMethod, setActiveMethod] = useState("credit-card");
    const [clientSecret, setClientSecret] = useState("");

	const handleMethodClick = (method: string) => {
		setActiveMethod(method);
	};

    const handleCreatePaymentIntent = async () =>{
        const res = await createPaymentIntentService(10000)
        console.log(res)
        setClientSecret(res.client_secret)
    }

	const getButtonClass = (method: string) =>
		`h-12 w-full rounded-md p-3 text-left ${
			activeMethod === method ? "bg-blue-400 text-white" : "bg-white"
		}`;

	const router = useRouter();

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
							onClick={() => router.push("/home")}
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
								<p className="mb-4 text-lg text-gray-600">
									Amount being paid now: 100 THB
								</p>
                                <button onClick={handleCreatePaymentIntent}>ClickME!</button>
								{activeMethod === "credit-card" && clientSecret && (
                                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                                        <CreditCardForm />
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
