import axios from "axios";

const serverAddr = process.env.SERVER_ADDRESS;

export const register = async (data: any) => {

    try {

        const options = {
            method: "POST",
            url: `${serverAddr}/auth/register`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        };

        const { user, token } = await axios.request(options);
        
        return {
            user, token
        };

    } catch (err) {
        throw err;
    }

}