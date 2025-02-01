"use client";

import { loginService } from "@/service/authService";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

/* state */
import { useAppDispatch } from "@/states/hook";
import { setUser } from "@/states/features/userSlice";
import { login } from "@/states/features/authSlice";

export default function LoginForm() {

  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // const data = {
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    // };

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { user, token } = await loginService({ email, password });

    dispatch(login(token));
    dispatch(setUser(user));

  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-auto w-full rounded-md border-2 border-purple-600 bg-white p-6 shadow-md md:max-w-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            LogIn
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              <MdEmail className="mr-2 inline-block" />
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              <RiLockPasswordFill className="mr-2 inline-block" />
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="flex w-full items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
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
              className="w-full rounded bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Do not have an acoount?
          <Link className="ml-2 text-blue-500 hover:underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
