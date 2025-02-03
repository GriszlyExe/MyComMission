"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { forgetPasswordSchema } from "./Schemas";
import { forgetPassword } from "@/service/forgetPassword";

export default function ForgetPassword() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-auto w-full rounded-md border-2 border-purple-600 bg-white p-6 md:max-w-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Forget Password
          </span>
        </h1>
        <p className="mb-4 text-gray-600">
          Please enter your email address. <br />
          You will receive a link to create a new password via email.
        </p>
        <Formik
          //Todo : Change this part to send email.
          initialValues={{ email: "" }}
          validationSchema={forgetPasswordSchema}
          onSubmit={async (values, actions) => {
            console.log("Sending link:", values);
            forgetPassword(values.email)
            actions.resetForm();
            router.push("../login");
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4" autoComplete="off">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  <MdEmail className="mr-2 inline-block" />
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  required
                  className={`input input-bordered w-full ${errors?.email && touched?.email ? "input-error" : "input-primary"}`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-xs text-red-500"
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
                  {isSubmitting ? "Sending..." : "Reset Password"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-sm text-gray-600">
          Go back to
          <Link className="ml-2 text-blue-500 hover:underline" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
