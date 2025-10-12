import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    console.log("User Register Info:", { email, username, phone, password });
    alert("Đăng ký thành công (demo)");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-sub">
      <div className="bg-white p-8 rounded-3xl shadow-md w-[400px] sm:w-[500px]">
        <div className="mb-6">
          <h2 className="text-sm text-gray-600">
            <span className="text-primary font-bold">UNIFEED.news</span>
          </h2>
          <h1 className="text-4xl font-bold mt-2">Đăng ký</h1>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="Nhập email"
              className="w-full px-4 text-[11px] py-2 border border-blue-400 rounded focus:outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Tên tài khoản
              </label>
              <input
                type="text"
                placeholder="Nhập tên tài khoản"
                className="w-full px-4 text-[11px] py-2 border rounded focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="w-full px-4 text-[11px] py-2 border rounded focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập password"
              className="w-full px-4 text-[11px] py-2 border rounded focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md shadow-md transition"
          >
            Đăng ký
          </button>

          <div className="my-6 text-center text-gray-400 text-sm">Hoặc</div>

          <p className="text-sm text-gray-500 text-center">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
