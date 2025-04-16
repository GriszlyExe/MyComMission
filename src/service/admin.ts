import axios from "axios";
import { serverAddr } from ".";
import exp from "constants";

export const adminLogin = async (username: string, password: string) => {
    try {
        // console.log(`Logging in as admin with username: ${username} with password: ${password}`);
        const { data: { admin, totalReports, totalUsers } } = await axios.post(`${serverAddr}/admin/login`, {
            username, password
        }, { withCredentials: true });

        return { admin, totalReports, totalUsers };
    } catch (error) {
        console.error("Error during admin login:", error);
        throw error;
    }
}

export const adminLogout = async () => {
    try {
        await axios.post(`${serverAddr}/admin/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error("Error during admin logout:", error);
        throw error;
    }
}

export const getPaginatedReports = async (page: number, limit: number) => {
    try {
        const { data: { reports, totalReports, totalUsers } } = await axios.get(`${serverAddr}/admin/reports/?page=${page}&limit=${limit}`, { withCredentials: true });
        return { reports, totalReports, totalUsers };
    } catch (error) {
        console.error("Error fetching paginated reports:", error);
        throw error;
    }
}

export const getPaginatedUsers = async (page: number, limit: number) => {
    try {
        const { data: { users, totalReports, totalUsers } } = await axios.get(`${serverAddr}/admin/users/?page=${page}&limit=${limit}`, { withCredentials: true });
        return { users, totalReports, totalUsers };
    } catch (error) {
        console.error("Error fetching paginated users:", error);
        throw error;
    }
}

export const banUser = async (userId: string) => {
    try {
        const { data: { user } } = await axios.patch(`${serverAddr}/admin/ban/${userId}`, {}, { withCredentials: true });
        const { banFlag } = user;
        return { userId, banFlag };
    } catch (error) {
        throw error;
    }
}

export const unbanUser = async (userId: string) => {
    try {
        const { data: { user } } = await axios.patch(`${serverAddr}/admin/unban/${userId}`, {}, { withCredentials: true });
        const { banFlag } = user;
        return { userId, banFlag };
    } catch (error) {
        throw error;
    }
}