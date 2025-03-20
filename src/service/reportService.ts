import { serverAddr } from ".";
import axios from "axios";

export const submitReport = async ({ data }: { data: any }) => {
    console.log(data)
    let requestBody;
    if(data.targetType === "USER"){
        requestBody={
            reportType: "USER",
            userId: data.targetId,
            reportDescription: data.description,
        }
    }
    if(data.targetType === "POST"){
        requestBody={
            reportType: "POST",
            postId: data.targetId,
            reportDescription: data.description,
        }
    }
    try{
        const options={
            method: "POST",
            url: `${serverAddr}/report/create`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: requestBody,
        }
        const report = await axios.request(options);

        return report.data;
    }
    catch(error){
        throw error;
    }
}

