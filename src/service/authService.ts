import axios from "axios";

const serverAddr = process.env.SERVER_ADDRESS;

export const register = async (data: any) => {

    try {

        if (!serverAddr) {
            console.log(`Server address is not provided`);
            return;
        }

        const options = {
            method: "POST",
            url: `${serverAddr}/auth/register`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        };

        const { data: { user, token } } = await axios.request(options);

        return {
            user, token
        };

    } catch (err) {
        throw err;
    }

}

interface LoginSchema {
    email: string;
    password: string;
}

export const loginService = async ({ email, password }: LoginSchema) => {

    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/auth/login`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: {
                email,
                password,
            },
        };

        const { data } = await axios.request(options);

        return {
            user: data.user,
            token: data.token,
        };

    } catch (err) {
        throw err;
    }

}