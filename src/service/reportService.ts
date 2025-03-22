import { serverAddr } from ".";
import axios from "axios";

export const submitReport = async ({ data }: { data: any }) => {
    console.log(data)
    let requestBody;
    if(data.targetType === "USER"){
        requestBody={
            reportType: "USER",
            reporteeId: data.targetId,
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
    if(data.targetType === "COMMISSION"){
        requestBody={
            reportType: "COMMISSION",
            commissionId: data.targetId,
            reportDescription: data.description,
        }
    }
    if(data.targetType === "GENERAL"){
        requestBody={
            reportType: "GENERAL",
            reportDescription: data.description,
        }
    }
    try{
        const options={
            method: "POST",
            url: `${serverAddr}/report/submit`,
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

