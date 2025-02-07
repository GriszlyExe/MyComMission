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

        console.log(`Registering new user...`);
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

        const { data: { user, token } } = await axios.request(options);

        return {
            user,
            token,
        };

    } catch (err) {
        throw err;
    }

}

export const clearAuthToken = async () => {

    try {
        
        const options = {
            method: "POST",
            url: `${serverAddr}/auth/logout`,
            withCredentials: true,
        }
    
        await axios.request(options);

        console.log(`Cleared token finished..`);

        return;

    } catch (err) {
        throw err;
    }

}