import axios from "axios";
import Email from "next-auth/providers/email";

const serverAddr = process.env.SERVER_ADDRESS || "http://localhost:12345";

export const forgetPassword = async (email:string) =>{

    try {

        console.log(serverAddr)
        if (!serverAddr){
            console.log(`Server address is not provided`);
            return;
        }

        const resetPageRoute = "http://localhost:3000/new-password"

        const data = {resetPageRoute,email}
        
        const options = {
            method: "POST",
            url: `${serverAddr}/forget-password/reset-password`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        };

        await axios.request(options)
        
        return 

    } catch (error) {
        console.log(error)
    }
}

export const newPassword = async (token:string,newPassword:string) =>{

    try {
        console.log(serverAddr)
        if (!serverAddr){
            console.log(`Server address is not provided`);
            return;
        }

        const data = {newPassword}
        
        const options = {
            method: "POST",
            url: `${serverAddr}/forget-password/new-password/${token}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        };

        await axios.request(options)
        
        return 

    } catch (error) {
        console.log(error)
    }
}