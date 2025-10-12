import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { user } from "../../assets/sampleData";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      const currentUser = user.find(
        (u) => u.email === email && u.password === password
      );
      if (!currentUser) {
        alert("Sai tài khoản hoặc mật khẩu.");
        return;
      }

      dispatch(setUser({ user: currentUser }));

      if (currentUser.role === "ADMIN") {
        navigate(`/admin/dashboard`);
      } else {
        navigate(`/department`);
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  const handleSignup = () => {
    navigate(`/signup`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sub ">
      <div className="w-full max-w-md bg-[white] rounded-3xl shadow-md px-8 py-10">
        <div className="mb-6">
          <h2 className="text-gray-600">
            Welcome to{" "}
            <span className="text-primary font-bold">UNIFEED.news</span>
          </h2>
          <h1 className="text-4xl font-bold mt-2">Sign in</h1>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Email address
          </label>
          <input
            type="text"
            placeholder="Username or email address"
            className="w-full border border-blue-400 text-[11px] rounded-lg px-4 py-2 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-2 relative">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 text-[11px] rounded-lg px-4 py-2 pr-10 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <LuEye />
            </span>
          </div>
        </div>

        <div className="text-right mb-6">
          <span className="text-sm text-primary cursor-pointer hover:underline">
            Forgot Password
          </span>
        </div>

        <button
          className="w-full bg-primary text-white font-medium py-2 rounded-lg shadow-md"
          onClick={handleLogin}
        >
          Sign in
        </button>

        <div className="my-6 text-center text-gray-400 text-sm">OR</div>

        <p className="text-sm text-gray-500 text-center">
          No Account?{" "}
          <span
            className="text-primary font-medium cursor-pointer hover:underline"
            onClick={handleSignup}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
