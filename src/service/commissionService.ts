import { serverAddr } from ".";
import axios from "axios";

export const createCommission = async (data: any) => {
	try {
		// Adapter
		data = {
			...data,
			deadline: new Date(data.dueDate).toISOString(),
			dueDate: undefined,
		};

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
