import { serverAddr } from ".";
import axios from "axios";

export const submitReport = async ({ data }: { data: any }) => {
    console.log(data)
    // try {

    //     const options = {
    //         method: "POST",
    //         url: `${serverAddr}/report/create`,
    //         headers: { "Content-Type": "application/json" },
    //         withCredentials: true,
    //         data: data,
    //     }

    //     const report = await axios.request(options);

    //     return report.data;

    // } catch (error) {
    //     throw error;
    // }
}

