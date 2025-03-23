import { serverAddr } from ".";
import axios from "axios";

export const getCommissionById = async (commissionId: string) => {
	try {
		const options = {
			method: "GET",
			url: `${serverAddr}/commission/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const { data } = await axios.request(options);

		return data;
	} catch (error) {
		throw error;
	}
};

export const createCommission = async (data: any) => {
	
	try {
		// console.log(data);
		const options = {
			method: "POST",
			url: `${serverAddr}/commission/create`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: data,
		};

		const commission = await axios.request(options);

		return commission.data;
	} catch (error) {
		throw error;
	}
};

export const acceptBrief = async (commissionId: string, updateInfo: any) => {
	try {

		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/brief/accept/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: updateInfo,
		};

		await axios.request(options);

		return;
		
	} catch (err) {
		throw err;
	}
}
