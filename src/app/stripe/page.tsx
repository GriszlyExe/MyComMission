'use client'

import React, { useState, useEffect, use } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe with your publishable key
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY! as string);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [K1, setK1] = useState(false)
    
    const mockAPI = async () =>{
        // Fetch the clientSecret from the backend when the component loads
        try {
            const data = {
                "amount" : 100,
                "currency" : "usd"
            }
            
            const options = {
                method: "POST",
                url: `http://localhost:12345/stripe/create-payment-intent`,
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                data: data,
            };
    
            const res = await axios.request(options)
            // console.log(res)

            // console.log("Client Secret =",res.data.clientSecret)

            return res
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        const fetchClientSecret = async () => {
            const res = await mockAPI();

            // console.log(res)
            setClientSecret(res?.data.client_secret)
            // console.log(`clientSecret = ${clientSecret}`)
        };

        fetchClientSecret();
    }, [K1]);


    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            // payment_method: {
                // card: elements.getElement(CardElement),
            // },
        });

        if (error) {
            console.error("Payment failed:", error.message);
        } else if (paymentIntent.status === "succeeded") {
            console.log("✅ Payment Successful:", paymentIntent);
            alert("Payment successful!");
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Enter Card Details</h2>
            <CardElement className="p-2 border rounded-md mb-4" />
            <button type="submit" disabled={!stripe} className="bg-blue-600 text-white p-2 rounded-md w-full">
                Pay Now
            </button>

            <p>Client Secret = {clientSecret}</p>
        </form>
        <button type="button" onClick={() => setK1(!K1)} className="bg-blue-600 text-white p-2 rounded-md w-full">
            TestAPI
        </button>
    </>
    );
};

const StripePage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripePage;
