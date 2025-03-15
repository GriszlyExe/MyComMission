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

export const rejectBrief = async (commissionId: string) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/reject-brief/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const commission = await axios.request(options);

		return commission.data;
	} catch (error) {
		throw error;
	}
};

export const editBrief = async (commissionId: string, data: any) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/send-brief/${commissionId}`,
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

export const createProposal = async (commissionId: string, data: any) => {
	try {
		// Adapter
		data = {
			...data,
			expectedDate: new Date(data.expectedDate).toISOString(),
		};

		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/send-proposal/${commissionId}`,
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

export const rejectProposal = async (commissionId: string) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/reject-proposal/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const commission = await axios.request(options);

		return commission.data;
	} catch (error) {
		throw error;
	}
};

export const acceptProposal = async (commissionId: string) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/accept-proposal/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const commission = await axios.request(options);

		return commission.data;
	} catch (error) {
		throw error;
	}
};

export const postponeCommission = async (commissionId: string, data: any) => {
	try {
		// Adapter
		data = {
			...data,
			expectedDate: new Date(data.expectedDate).toISOString(),
		};

		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/postpone/${commissionId}`,
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

export const uploadArtwork = async (picture: FormData) => {
	try {
		const options = {
			method: "POST",
			url: `${serverAddr}/commission/upload-artwork`,
			withCredentials: true,
			data: picture,
		};

		const commission = await axios.request(options);

		return commission.data;
	} catch (error) {
		throw error;
	}
};

export const sendArtwork = async (commissionId: string, data: any) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/send-artwork/${commissionId}`,
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

export const rejectArtwork = async (commissionId: string) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/reject-artwork/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const commission = await axios.request(options);

		return commission.data;
	} catch (error) {
		throw error;
	}
};

export const acceptArtwork = async (commissionId: string) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/accept-artwork/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
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

export const getArtworkByUserId = async (userId: string) => {
	try {
		const options = {
			method: "GET",
			url: `${serverAddr}/commmission/artworks/${userId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const {
			data: { posts, user },
		} = await axios.request(options);

		return {
			posts: posts ? posts : [],
			user: user,
		};
	} catch (err) {
		throw err;
	}
};
