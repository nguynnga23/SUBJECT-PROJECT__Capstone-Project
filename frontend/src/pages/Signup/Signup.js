import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-sub">
      <div className="bg-white p-8 rounded-3xl shadow-md w-[400px] sm:w-[500px]">
        <div className="mb-6">
          <h2 className="text-sm text-gray-600">
            Welcome to{" "}
            <span className="text-primary font-bold">UNIFEED.news</span>
          </h2>
          <h1 className="text-4xl font-bold mt-2">Sign up</h1>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Enter email address
            </label>
            <input
              type="text"
              placeholder="Username or email address"
              className="w-full px-4 text-[11px] py-2 border border-blue-400 rounded focus:outline-none focus:ring"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                User name
              </label>
              <input
                type="text"
                placeholder="User name"
                className="w-full px-4 text-[11px] py-2 border rounded focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Contact Number
              </label>
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full px-4 text-[11px] py-2 border rounded focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Enter your Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 text-[11px] py-2 border rounded focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md shadow-md transition"
          >
            Sign up
          </button>
          <div className="my-6 text-center text-gray-400 text-sm">OR</div>

          <p className="text-sm text-gray-500 text-center">
            <span className="text-sm text-center">
              Have an Account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
