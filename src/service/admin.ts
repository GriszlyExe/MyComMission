import axios from "axios";
import { serverAddr } from ".";
import exp from "constants";
import { ReportStatus } from "@/common/model";

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

type ReportPaginationArgs = {
    page: number;
    limit: number;
    search: string;
    tag: ReportStatus | null;
}

export const getPaginatedReports = async ({ page, limit, search, tag }: ReportPaginationArgs) => {
    try {
        console.log({ page, limit, search, tag });
        let searchQuery = `?page=${page}&limit=${limit}`;
        if (search) searchQuery += `&search=${search}`;
        if (tag) searchQuery += `&tag=${tag}`;

        const { data: { reports, totalReports, totalUsers } } = await axios.get(`${serverAddr}/admin/reports/${searchQuery}`, { withCredentials: true });
        return { reports, totalReports, totalUsers };
    } catch (error) {
        console.error("Error fetching paginated reports:", error);
        throw error;
    }
}

type UserPaginationArgs = {
    page: number;
    limit: number;
    search: string;
    banFlag: boolean | null;
}

export const getPaginatedUsers = async ({ page, limit, search, banFlag }: UserPaginationArgs) => {
    try {

        let searchQuery = `?page=${page}&limit=${limit}`;
        if (search) searchQuery += `&search=${search}`;
        if (banFlag !== null) searchQuery += `&banFlag=${banFlag}`;

        const { data: { users, totalReports, totalUsers } } = await axios.get(`${serverAddr}/admin/users/${searchQuery}`, { withCredentials: true });
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

export const approveReport = async (reportId: string) => {
    try {
        const { data: { report } } = await axios.patch(`${serverAddr}/admin/reports/${reportId}/resolve`, {}, { withCredentials: true });
        const { reportStatus } = report;
        return { reportId, reportStatus };
    } catch (error) {
        throw error;
    }
}