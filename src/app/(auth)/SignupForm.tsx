"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupSchema } from "../../common/Schemas";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "@/stores/hook";
import { login } from "@/stores/features/authSlice"
import { register } from "@/service/authService";
import { setUser } from "@/stores/features/userSlice";
import { User } from "@/common/model";

type RegisterSchema = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (
    values: RegisterSchema,
    actions: FormikHelpers<RegisterSchema>,
  ) => {
    // console.log("Signing up:", values);

    try {
      console.log(values);
      const { confirmPassword, ...registerBody } = values;

      const { user, token } = await register(registerBody) as { user: User, token: string };

      dispatch(login(token));
      dispatch(setUser(user));

      actions.resetForm();
      router.push("../home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-auto w-full max-w-lg rounded-md border-2 border-purple-600 bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          <span className="bg-gradient-to-r from-primary-content to-secondary-content bg-clip-text text-transparent">
            Registration
          </span>
        </h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            birthDate: new Date(Date.now()),
            phone: "",
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-3" autoComplete="off">
              <div className="flex justify-between gap-3">
                <div className="w-1/2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Firstname<span className="text-red-500"> *</span>
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    required
                    className={`input input-bordered w-full ${
                      errors.firstName && touched.firstName
                        ? "input-error"
                        : "input-primary"
                    }`}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    // className="text-xs text-red-500"
                    className="text-xs text-error"
                  />
                </div>
                <div className="w-1/2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Lastname<span className="text-red-500"> *</span>
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    required
                    className={`input input-bordered w-full ${
                      errors.lastName && touched.lastName
                        ? "input-error"
                        : "input-primary"
                    }`}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    // className="text-xs text-red-500"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <div className="w-1/2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Birth Date<span className="text-red-500"> *</span>
                  </label>
                  <Field
                    type="date"
                    name="birthDate"
                    required
                    className={`input input-bordered w-full ${
                      errors.birthDate && touched.birthDate
                        ? "input-error"
                        : "input-primary"
                    }`}
                  />
                  <ErrorMessage
                    name="birthDate"
                    component="p"
                    // className="text-xs text-red-500"
                    className="text-xs text-error"
                  />
                </div>
                <div className="w-1/2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Phone Number<span className="text-red-500"> *</span>
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    required
                    className={`input input-bordered w-full ${
                      errors.phone && touched.phone
                        ? "input-error"
                        : "input-primary"
                    }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    // className="text-xs text-red-500"
                    className="text-xs text-error"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Display Name<span className="text-red-500"> *</span>
                </label>
                <Field
                  type="text"
                  name="displayName"
                  required
                  className={`input input-bordered w-full ${
                    errors.displayName && touched.displayName
                      ? "input-error"
                      : "input-primary"
                  }`}
                />
                <ErrorMessage
                  name="displayName"
                  component="p"
                  // className="text-xs text-red-500"
                  className="text-xs text-error"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Email<span className="text-red-500"> *</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  required
                  className={`input input-bordered w-full ${
                    errors.email && touched.email
                      ? "input-error"
                      : "input-primary"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  // className="text-xs text-red-500"
                  className="text-xs text-error"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Password<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className={`input input-bordered w-full ${
                      errors.password && touched.password
                        ? "input-error"
                        : "input-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  // className="text-xs text-red-500"
                  className="text-xs text-error"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Confirm Password<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    className={`input input-bordered w-full ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "input-error"
                        : "input-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  // className="text-xs text-red-500"
                  className="text-xs text-error"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded px-4 py-3 text-white focus:outline-none ${
                    isSubmitting
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-gradient-to-r from-primary-content to-secondary-content hover:from-base-200 hover:to-base-300"
                  }`}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-sm text-gray-600">
          Have an account?
          <Link className="ml-2 text-blue-500 hover:underline" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
