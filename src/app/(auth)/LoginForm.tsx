"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { loginService } from "@/service/authService";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginSchema } from "../../common/Schemas";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/* state */
import { useAppDispatch } from "@/states/hook";
import { setUser } from "@/states/features/userSlice";
import { login } from "@/states/features/authSlice";

interface loginSchema2 {
  email: string;
  password: string;
}

export default function LoginForm() {
  
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  const handleSubmit = async (values: loginSchema2, actions: FormikHelpers<loginSchema2>) => {
    
    try {
      const { email, password } = values;
      
      const { user, token } = await loginService({ email, password });
      
      dispatch(login(token));
      dispatch(setUser({ user }));
  
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
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Log In
          </span>
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          // onSubmit={async (values, actions) => {
          //   console.log("Logging in:", values);
          //   await new Promise((resolve) => setTimeout(resolve, 1000));
          //   actions.resetForm();
          //   router.push("../home");
          // }}
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
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className={`input input-bordered w-full ${errors?.email && touched?.email ? "input-error" : "input-primary"}`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  <RiLockPasswordFill className="mr-2 inline-block" />
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    required
                    className={`input input-bordered w-full ${errors?.password && touched?.password ? "input-error" : "input-primary"}`}
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
                  className="text-xs text-red-500"
                />
              </div>
              <div className="flex w-full items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4"
                  />
                  <span className="text-xs text-gray-600">Remember me</span>
                </label>
                <Link
                  className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
                  href="/forget-password"
                >
                  Forget Password?
                </Link>
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
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?
          <Link className="ml-2 text-blue-500 hover:underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
