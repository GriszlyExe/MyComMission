import { serverAddr } from ".";
import axios, { AxiosRequestConfig } from "axios";

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

		const { data: { commission } } = await axios.request(options);

		return commission;
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

export const sendArtWork = async ({ commissionId, artwork, artistId }: { commissionId: string, artistId: string, artwork: File }) => {
	try {
		const uploadUrlOptions = {
			method: "GET",
			url: `${serverAddr}/commission/artwork/upload/url/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: {
				fileType: artwork.type,
			}
		};

		const { data: { uploadUrl, artworkPath } } = await axios.request(uploadUrlOptions);
		
		await axios.put(uploadUrl, artwork, {
			headers: {
				"Content-Type": artwork.type,
			}
		});

		const options = {
			method: "PATCH",
			url: `${serverAddr}/commission/artwork/send/${commissionId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: {
				artworkPath,
				artistId: artistId,
			}
		};

		await axios.request(options);

	} catch (err) {
		throw err;
	}
}

export const acceptArtwork = updateStateWrapper(`artwork/accept`);

/* GET artworks from a specific user */
export const getArtworksByUserId = async (userId: string) => {
    try {
        const options: AxiosRequestConfig = {
            method: "GET",
            url: `${serverAddr}/commission/artwork/from/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const { data } = await axios.request(options);
        return data
    } catch (err) {
        throw err;
    }
};