import axios from "axios";
import { serverAddr } from ".";

export const adminLogin = async (username: string, password: string) => {
    try {
        // console.log(`Logging in as admin with username: ${username} with password: ${password}`);
        const { data: { admin } } = await axios.post(`${serverAddr}/admin/login`, {
            username, password
        }, { withCredentials: true });

        return admin;
    } catch (error) {
        console.error("Error during admin login:", error);
        throw error;
    }
}