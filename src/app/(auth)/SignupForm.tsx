import Link from "next/link";

export default function SignupForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-auto w-full rounded-md border-2 border-purple-600 bg-white p-6 md:max-w-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Registration
          </span>
        </h1>
        <form className="space-y-3">
          <div className="flex justify-between">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Firstname
              </label>
              <input
                type="text"
                required
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Lastname
              </label>
              <input
                type="text"
                required
                className="input input-bordered input-primary w-full"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                required
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="input input-bordered input-primary w-full"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="text"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full rounded bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Have an acoount?
          <Link className="ml-2 text-blue-500 hover:underline" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
