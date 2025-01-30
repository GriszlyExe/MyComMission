export default function NewPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-auto w-full rounded-md border-2 border-purple-600 bg-white p-6 md:max-w-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Change Your Password
          </span>
        </h1>
        <form className="space-y-4">
          <p className="text-gray-600">
            Enter a new password below to change your password.
          </p>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              New password
            </label>
            <input
              type="password"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Confirm new password
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
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
