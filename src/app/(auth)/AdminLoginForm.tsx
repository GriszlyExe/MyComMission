"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { loginService } from "@/service/authService";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { adminLoginSchema } from "@/common/Schemas";
import { Dispatch, SetStateAction, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";

/* state */
import { useAppDispatch } from "@/stores/hook";
import { setUser } from "@/stores/features/userSlice";
import { login } from "@/stores/features/authSlice";

type FormSchema = yup.InferType<typeof adminLoginSchema>;

export default function AdminLoginForm({
    toggleShowLogin,
    setEmail,
}: {
    toggleShowLogin: () => void;
    setEmail: Dispatch<SetStateAction<string>>;
}) {
    const [isError, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const dispatch = useAppDispatch();

    const handleSubmit = async (
        values: FormSchema,
        actions: FormikHelpers<FormSchema>,
    ) => {
        try {
            const { email, password } = values;
            const { user, token } = await loginService({
                email,
                password,
            });

            if (token) {
                dispatch(login(token));
                dispatch(setUser(user));
                actions.resetForm();
                router.push("/home");
            } else {
                setEmail(email);
                toggleShowLogin();
            }
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="m-auto w-full max-w-lg rounded-md border-2 border-primary-content bg-white p-6 shadow-md">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    <span className="text-primary">
                        Admin Panel
                    </span>
                </h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={adminLoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-4" autoComplete="off">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    <MdEmail className="mr-2 inline-block" />
                                    Email
                                </label>
                                <Field
                                    type="input"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    className={`input input-bordered w-full ${errors?.email && touched?.email ? "input-error" : "input-secondary"}`}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-xs text-error"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    <RiLockPasswordFill className="mr-2 inline-block" />
                                    Password
                                </label>
                                <div className="relative">
                                    <Field
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        className={`input input-bordered w-full ${errors?.password && touched?.password ? "input-error" : "input-secondary"}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-xs text-error"
                                />
                            </div>
                            <div className="">
                                {isError && (
                                    <span className="font-bold text-error">
                                        Wrong email or password
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full rounded px-4 py-3 text-white font-bold focus:outline-none hover:text-primary ${
                                        isSubmitting
                                            ? "cursor-not-allowed bg-gray-400"
                                            : "bg-gradient-to-r from-primary-content to-secondary-content hover:from-base-200 hover:to-base-300"
                                    }`}
                                >
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
