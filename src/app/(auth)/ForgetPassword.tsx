"use client"

import Link from "next/link";
import { MdEmail } from "react-icons/md";

export default function ForgetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-auto w-full rounded-md border-2 border-purple-600 bg-white p-6 md:max-w-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Forget Password
          </span>
        </h1>
        <form className="space-y-4">
          <p className="text-gray-600">
            Please enter your email address. <br />
            You will receive a link to create a new password via email.
          </p>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              <MdEmail className="mr-2 inline-block" />
              Email
            </label>
            <input
              type="text"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full rounded bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none"
            >
              Reset Password
            </button>
          </div>
        </form>
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
