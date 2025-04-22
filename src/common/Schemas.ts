import * as yup from "yup";
import { FilePreview } from "@/common/interface";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),

    password: yup.string().required("Password is required"),
});

export const adminLoginSchema = yup.object().shape({
    username: yup
        .string()
        // .email("Invalid email format")
        // .matches(/^[a-zA-Z0-9._%+-]+@admin$/, "Invalid email format")
        .required("username is required"),

    password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),

    lastName: yup.string().required("Last name is required"),

    birthDate: yup
        .date()
        .max(new Date(), "Birthdate cannot be in the future")
        .required("Birthdate is required"),

    phone: yup
        .string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),

    displayName: yup.string().required("Display name is required"),

    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),

    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .required("Password is required"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export const forgetPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
});

export const newPasswordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .required("Password is required"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
});


export const changePasswordSchema = yup.object().shape({ //for changing password in settings page
    oldPassword: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .required("Old password is required"),

    newPassword: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .required("New password is required"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
});


export const twoFactorCode = yup.object().shape({
    code: yup
        .string()
        .matches(/^\d+$/, "Only digits are allowed")
        .length(6, "Two-factor code must be exactly 6 digits")
        .required("Two-factor code is required"),
});



export const accountSchema = yup.object().shape({
    firstName: yup.string().max(72, "First name cannot be longer than 72 characters").required("First name is required"),

    lastName: yup.string().max(72, "Last name cannot be longer than 72 characters").required("Last name is required"),

    birthDate: yup
        .date()
        .max(new Date(), "Birthdate cannot be in the future")
        .required("Birthdate is required"),

    phone: yup
        .string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),

    displayName: yup.string().max(72, "Display name cannot be longer than 72 characters").required("Display name is required"),

    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),

    profilePic: yup
        .string(),

    location: yup.string().max(100, "Location is too long").required("location is required"),
    description: yup.string().max(100, "Description is too long").required("description is required")
})

export const postSchema = yup.object().shape({
    postDescription: yup.string().max(2048, "Description is too long").required("Description is required"),
    postTags: yup.array().of(yup.string()).min(1, "Please select at least one tag").required(),
    images: yup.array().of(yup.mixed<FilePreview>()).min(1, "Please upload at least one image").required("Images are required"),});