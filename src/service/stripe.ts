import axios from "axios";

const serverAddr = process.env.SERVER_ADDRESS || "http://localhost:12345";

export const createPaymentIntentService = async (amount: number) => {
	try {
		if (!serverAddr) {
			console.log(`Server address is not provided`);
			return;
		}

		const data = { amount, currency: "thb" };

		const options = {
			method: "POST",
			url: `${serverAddr}/stripe/create-payment-intent`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: data,
		};

		const res = await axios.request(options);
		console.log("Fetch complete");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
