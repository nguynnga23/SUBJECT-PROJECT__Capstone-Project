import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { login } from "../../apis/auth";
import Spinner from "../../components/Spinner";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { request: fetchLogin, loading: loadingFetchLogin } = useApi(login);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      try {
        const result = await fetchLogin({ email, password });

        toast.success(`Đăng nhập thành công`);
        dispatch(setUser(result.user));
        navigate(`/admin/dashboard`);
      } catch (err) {
        toast.error("Đăng nhập thất bại");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn reload trang
    handleLogin();
  };

  const handleSignup = () => {
    navigate(`/signup`);
  };

  if (loadingFetchLogin) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sub">
      <div className="w-full max-w-[400px] bg-[white] rounded-3xl shadow-md px-8 py-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-gray-600">
              <span className="text-primary font-bold">UNIFEED.news</span>
            </h2>
            <h1 className="text-4xl font-bold mt-2">Đăng ký</h1>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="text"
              placeholder="Nhập email"
              className="w-full border border-blue-400 text-[11px] rounded-lg px-4 py-2 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-2 relative">
            <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập password"
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
              Quên mật khẩu
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-2 rounded-lg shadow-md"
          >
            Đăng nhập
          </button>
        </form>

        <div className="my-6 text-center text-gray-400 text-sm">Hoặc</div>

        <p className="text-sm text-gray-500 text-center">
          Không có tài khoản?{" "}
          <span
            className="text-primary font-medium cursor-pointer hover:underline"
            onClick={handleSignup}
          >
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
