import { useState } from "react";

function UpdatePassword({ setShowUpdatePasswordForm, setUserProfile }) {
  const [currentPassWord, setCurrentPassWord] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/; // Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ cái, số và ký tự đặc biệt
  const handleUpdatePassword = async () => {
    if (!currentPassWord || !newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      alert(
        "Mật khẩu mới phải có ít nhất 6 ký tự, gồm chữ, số và ký tự đặc biệt."
      );
      return;
    }
  };

  const handleBack = () => {
    setShowUpdatePasswordForm(false);
    setUserProfile(true);
  };

  return (
    <div className="relative w-[600px] max-w-md mx-auto bg-white rounded space-y-6 p-6 shadow">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl flex items-center justify-center w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white"
        onClick={() => {
          setShowUpdatePasswordForm(false);
          setUserProfile(false);
        }}
      >
        &times;
      </button>
      <h2 className="text-[25px] font-semibold">Đổi mật khẩu</h2>
      <p className="text-[12px] text-gray-500 mb-2">
        <strong>Lưu ý:</strong> Mật khẩu bao gồm chữ kèm theo số hoặc ký tự đặc
        biệt, tối thiểu 8 ký tự trở lên & tối đa 32 ký tự.
      </p>

      <div className="bg-white rounded-lg dark:bg-gray-800">
        <div className="mb-4">
          <label className="block text-blue-700 font-medium">
            Mật khẩu hiện tại
          </label>
          <div className="flex border rounded-lg overflow-hidden">
            <input
              type={showCurrent ? "text" : "password"}
              className="w-full px-3 py-2 focus:outline-none dark:bg-gray-800"
              placeholder="Nhập mật khẩu hiện tại"
              value={currentPassWord}
              onChange={(e) => setCurrentPassWord(e.target.value)}
            />
            <button
              className="px-3 bg-gray-200 "
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? "Ẩn" : "Hiện"}
            </button>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className="mb-4">
          <label className="block text-blue-700 font-medium">
            Mật khẩu mới
          </label>
          <div className="flex border rounded-lg overflow-hidden">
            <input
              type={showNew ? "text" : "password"}
              className="w-full px-3 py-2 focus:outline-none dark:bg-gray-800 dark:text-gray-300"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="px-3 bg-gray-200 "
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? "Ẩn" : "Hiện"}
            </button>
          </div>
        </div>

        {/* Nhập lại mật khẩu mới */}
        <div className="mb-4">
          <label className="block font-medium text-blue-700">
            Nhập lại mật khẩu mới
          </label>
          <div className="flex border rounded-lg overflow-hidden">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full px-3 py-2 focus:outline-none dark:bg-gray-800 font-medium "
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="px-3 bg-gray-200  "
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "Ẩn" : "Hiện"}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-8 py-2 bg-gray-400 text-white rounded hover:bg-blue-700 transition"
            onClick={handleBack}
          >
            Quay lại
          </button>
          <button
            className={`px-8 py-2 rounded-lg dark:bg-gray-700 dark:text-gray-300 ${
              newPassword && confirmPassword
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
            disabled={!newPassword || !confirmPassword}
            onClick={() => handleUpdatePassword()}
          >
            Cập nhật
          </button>
        </div>
      </div>
      {/* Mật khẩu hiện tại */}
    </div>
  );
}

export default UpdatePassword;
