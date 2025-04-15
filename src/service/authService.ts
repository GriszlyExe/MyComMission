import axios from "axios";
import { serverAddr } from ".";
interface LoginSchema {
    email: string;
    password: string;
}

interface TwoFASchema {
    email: string
    token: string
}

export const register = async (data: any) => {

    try {

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
            user,
            token,
        };

    } catch (err) {
        throw err;
    }

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

        return;

    } catch (err) {
        throw err;
    }

}

export const check2FA = async ({
    email,
    token
}: TwoFASchema) => {

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

        const { data: { user, authToken } } = await axios.request(options);

        return {
            user,
            authToken
        }


    } catch (err) {
        throw err;
    }
}

export const sendEmail = async (
    email: string
) => {

    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/auth/send-email`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: {
                email,
            },
        };

        const { data: { user, authToken } } = await axios.request(options);

        return {
            user,
            authToken
        }
    }
    catch (err) {
        throw err;
    }
}