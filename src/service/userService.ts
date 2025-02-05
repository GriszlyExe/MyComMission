import axios, { AxiosRequestConfig } from "axios"

const serverAddr = process.env.SERVER_ADDRESS;

export const getUserInfo = async (userId: string) => {

}

export const updateUser = async (forms: any) => {

    try {
        
        if (!serverAddr) {
            throw new Error(`Server error is not provided`)
        }

        console.log(`Updating user...`);

        const { user, picture } = forms;
        const userId = user.userId;

        const options: AxiosRequestConfig = {
            method: "PATCH",
            url: `${serverAddr}/user/account/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: user,
        }

        const { data } = await axios.request(options);

        console.log(data);

        return {
            user: data.user,
        }

    } catch (error) {
        throw error;
    }

}