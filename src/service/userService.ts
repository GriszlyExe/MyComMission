import axios, { AxiosRequestConfig } from "axios";

const serverAddr = process.env.SERVER_ADDRESS;

export const getUserInfo = async (userId: string) => {
	try {
		const options = {
			method: "GET",
			url: `${serverAddr}/user/profile/${userId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const {
			data: { user },
		} = await axios.request(options);

		return user;
	} catch (err) {
		throw err;
	}
};

const changeProfilePicture = async (userId: string, picture: FormData) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/user/account/profile-pic/${userId}`,
			withCredentials: true,
			data: picture,
		};

		const {
			data: { profileUrl },
		} = await axios.request(options);

		return profileUrl;
	} catch (err) {
		throw err;
	}
};

export const getSuggestedArtist = async (amount: number) => {
	try {

		const options: AxiosRequestConfig = {
			method: "GET",
			url: `${serverAddr}/user/top-artists/${amount}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const { data: { artists }} = await axios.request(options);

		return artists;
		
	} catch (error) {
		throw error;
	}
}

export const updateUser = async (forms: any) => {
	try {
		console.log(`update user called`);

		const { user, picture } = forms;
		const userId = user.userId;
		let profileUrl: string = user.profileUrl;

		if (picture && picture.has("picture"))
			profileUrl = await changeProfilePicture(userId, picture);

		// console.log(user);
		const options: AxiosRequestConfig = {
			method: "PATCH",
			url: `${serverAddr}/user/account/${userId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: user,
		};

		// console.log(options.data);

		const { data } = await axios.request(options);

		return {
			user: {
				...data.user,
				profileUrl,
			},
		};
	} catch (err) {
		throw err;
	}
};

export const changePassword = async ({
	userId,
	oldPassword,
	newPassword,
}: {
	userId: string;
	oldPassword: string;
	newPassword: string;
}) => {
	try {
		const options = {
			method: "PATCH",
			url: `${serverAddr}/user/change-password/${userId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: { oldPassword, newPassword },
		};

		const {
			data: { user },
		} = await axios.request(options);

		return user;
	} catch (err) {
		throw err;
	}
};

export const enable2Fa1 = async (userId: string) => {
	try {
		const options = {
			method: "POST",
			url: `${serverAddr}/user/enable-2fa/${userId}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		await axios.request(options);

		return;
	} catch (err) {
		throw err;
	}
};

export const enable2Fa2 = async ({
	email,
	token,
	userId,
}: {
	email: string;
	token: string;
	userId: string;
}) => {
	try {
		const options = {
			method: "POST",
			url: `${serverAddr}/auth/two-factor-enable`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
			data: {
				email,
				token,
			},
		};

		await axios.request(options);
		await updateUser({
			user: {
				userId,
				enabled2FA: true,
			},
		});

		return;
	} catch (err) {
		throw err;
	}
};

// Use for search display name
export const searchDisplayname = async (displayName: string) => {
	try {
		const options = {
			method: "GET",
			url: `${serverAddr}/user?search=${displayName}`,
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const {data} = await axios.request(options);
		return data
	} catch (err) {
		throw err;
	}
};
