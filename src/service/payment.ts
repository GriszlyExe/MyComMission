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
            url: `${serverAddr}/payment/stripe/create-payment-intent`,
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

export const createQRPayment = async (userPhoneNumber: string,amount:number) => {
    try {
        if (!serverAddr) {
            console.log(`Server address is not provided`);
            return;
        }

        const data = {amount,userPhoneNumber};

        const options = {
            method: "POST",
            url: `${serverAddr}/payment/promptpay/create-qr`,
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
}

export const createPostBoostTransaction = async ({
    selectedPosts,
    expiration,
    amount,
    count
}:
{
    selectedPosts:any,
    expiration:Date,
    amount:number,
    count:number
}) => {

    try {
        if (!serverAddr) {
            console.log(`Server address is not provided`);
            return;
        }

        const data = {posts:selectedPosts,expiredDate:expiration,amount,count};

        const options = {
            method: "POST",
            url: `${serverAddr}/payment/create-post-boost-transaction`,
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

}