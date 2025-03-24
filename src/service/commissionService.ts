import { serverAddr } from ".";
import axios from "axios";

/* Commission Info */
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

/* create commission */
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

/* state lifecycle */
const updateStateWrapper = (endpoint: string) => {
	return async (commissionId: string, updateInfo: any) => {
		try {
			console.log(JSON.stringify(updateInfo));
			const options = {
				method: "PATCH",
				url: `${serverAddr}/commission/${endpoint}/${commissionId}`,
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
}

export const acceptBrief = updateStateWrapper(`brief/accept`);
export const editBrief = updateStateWrapper(`brief/edit`);
export const rejectBrief = updateStateWrapper(`breif/reject`);
export const acceptProposal = updateStateWrapper(`proposal/accept`);
export const editProposal = updateStateWrapper(`proposal/edit`);
export const rejectProposal = updateStateWrapper(`proposal/reject`);