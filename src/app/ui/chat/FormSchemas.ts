import * as yup from "yup";
// import { FilePreview } from "@/common/interface";


export const briefSchema = yup.object().shape({
    name: yup.string().required("Brief name is required"),

    details: yup.string().required("Brief details are required"),

    deadline: yup
        .date()
        .min(new Date(), "Deadline cannot be in the past")
        .required("Deadline is required"),

    price: yup
        .string()
        .matches(/^\d+$/, "Price must be a valid number")
        .required("Price is required"),
    commercialUse: yup
        .boolean()

});