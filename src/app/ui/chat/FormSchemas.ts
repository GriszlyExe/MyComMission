import * as yup from "yup";
// import { FilePreview } from "@/common/interface";


export const briefSchema = yup.object().shape({
    commissionName: yup.string().required("Brief name is required"),

    briefDescription: yup.string().required("Brief details are required"),

    dueDate: yup
        .date()
        .min(new Date(), "Deadline cannot be in the past")
        .required("Deadline is required"),

    budget: yup
        .string()
        .matches(/^\d+$/, "Price must be a valid number")
        .required("Price is required"),
    commercialUse: yup
        .boolean()

});


export const postPoneSchema = yup.object().shape({

    newDeadline: yup
        .date()
        .min(new Date(), "Deadline cannot be in the past")
        .required("Deadline is required"),

});