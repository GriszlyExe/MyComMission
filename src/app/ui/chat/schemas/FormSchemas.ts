import * as yup from "yup";
// import { FilePreview } from "@/common/interface";

export const briefSchema = yup.object().shape({
	commissionName: yup.string().required("Brief name is required"),
	briefDescription: yup.string().required("Brief details are required"),
	deadline: yup
		// .string()
		// .datetime().min()
		.date()
		.min(new Date(), "Deadline cannot be in the past")
		.required("Deadline is required"),
	budget: yup
		.number()
		.min(0, "Budget must be a positive number")
		.required("Price is required"),
	commercialUse: yup.boolean(),
});

export const proposalSchema = yup.object().shape({
	expectedDate: yup
		.date()
		.min(new Date(), "Expected Date cannot be in the past")
		.required("Expected Date is required"),

	proposalPrice: yup
		.string()
		.matches(/^\d+$/, "Price must be a valid number")
		.required("Price is required"),
});

export const artworkSchema = yup.object().shape({
	// expectedDate: yup
	// 	.date()
	// 	.min(new Date(), "Expected Date cannot be in the past")
	// 	.required("Expected Date is required"),
	// proposalPrice: yup
	// 	.string()
	// 	.matches(/^\d+$/, "Price must be a valid number")
	// 	.required("Price is required"),
});

export const postPoneSchema = yup.object().shape({
	newDeadline: yup
		.date()
		.min(new Date(), "Deadline cannot be in the past")
		.required("Deadline is required"),
});
