import { serverAddr } from ".";
import axios from "axios";

export const createReview = async ({ data }: { data: any }) => {
    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/review/create`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        }

        const review = await axios.request(options);

        return review.data;

    } catch (error) {
        throw error;
    }
}

export const getReviewByUserId = async (userId: string) => {

    try {

        const options = {
            method: "GET",
            url: `${serverAddr}/review/user/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }

        const { data } = await axios.request(options)

        return {
            data: data
        }

    } catch (error) {
        throw error
    }

}