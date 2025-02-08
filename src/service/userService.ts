import axios, { AxiosRequestConfig } from "axios"

const serverAddr = process.env.SERVER_ADDRESS;

export const getUserInfo = async (userId: string) => {

    try {

        const options = {
            method: "GET",
            url: `${serverAddr}/profile/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }

        const { data: { user } } = await axios.request(options);

        return user;

    } catch (err) {
        throw err;
    }

}

const changeProfilePicture = async (userId: string, picture: FormData) => {

    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/account/profile-pic/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: picture,
        }

        const { data: { profileUrl } } = await axios.request(options);

        return profileUrl;

    } catch (err) {
        throw err;
    }
}

export const updateUser = async (forms: any) => {

    try {

        const { user, picture } = forms;
        const userId = user.userId;
        let profileUrl: string = user.profileUrl;

        if (picture.has("picture"))
            profileUrl = await changeProfilePicture(userId, picture);

        const options: AxiosRequestConfig = {
            method: "PATCH",
            url: `${serverAddr}/user/account/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: user,
        }

        const { data } = await axios.request(options);

        return {
            user: {
                ...data.user,
                profileUrl,
            },
        }

    } catch (err) {
        throw err;
    }

}