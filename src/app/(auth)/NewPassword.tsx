"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { newPasswordSchema } from "../../common/Schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { newPassword } from "@/service/forgetPassword";

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const router = useRouter();

  const searchParam = useSearchParams();
  const token = searchParam.get('token')


  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-auto w-full rounded-md border-2 border-purple-600 bg-white p-6 md:max-w-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Change Your Password
          </span>
        </h1>
        <p className="mb-4 text-gray-600">
          Enter a new password below to change your password.
        </p>
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={newPasswordSchema}
          onSubmit={async (values, actions) => {
            console.log("Changing password:", values);
            const password = values.newPassword
            if(token){
              newPassword(token,password)
            }
            actions.resetForm();
            router.push("../login");
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-3" autoComplete="off">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  New password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    required
                    className={`input input-bordered w-full ${
                      errors.newPassword && touched.newPassword
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
                  name="newPassword"
                  component="p"
                  // className="text-xs text-red-500"
                  className="text-xs text-error"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Confirm Password
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
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  {isSubmitting ? "Changing..." : "Change Password"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
