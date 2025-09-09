import { useRef, useState } from "react";

function ProfileForm({
  setUserProfile,
  currentUser,
  setShowUpdatePasswordForm,
}) {
  const [avatarPreview, setAvatarPreview] = useState(
    "https://i.pravatar.cc/40"
  );
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleClickAvatar = () => {
    fileInputRef.current.click();
  };

  const handleShowChangePassword = () => {
    setUserProfile(false);
    setShowUpdatePasswordForm(true);
  };

  return (
    <div className="relative w-[600px] mx-auto bg-white rounded space-y-6 p-6 shadow">
      {/* Nút đóng */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl flex items-center justify-center w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white"
        onClick={() => setUserProfile(false)}
      >
        &times;
      </button>

      <div className="flex items-center">
        <div>
          <img
            src={avatarPreview}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow"
            onClick={handleClickAvatar}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            hidden
          />
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {currentUser ? currentUser.username : "N/A"}
          </h2>
          <i className="text-sm">
            {currentUser ? currentUser.studentId : "N/A"}
          </i>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Nhập email "
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            disabled
            value={currentUser && currentUser.email}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700">
            Số điện thoại
          </label>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            value={currentUser && currentUser.number}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700">
            Khoa
          </label>
          <input
            type="text"
            placeholder="Tên khoa"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            value={currentUser && currentUser.department}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700">
            Lớp học
          </label>
          <input
            type="text"
            placeholder="Tên lớp học"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            value={currentUser && currentUser.classRoom}
          />
        </div>

        <button
          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-blue-700 transition"
          onClick={handleShowChangePassword}
        >
          Cập nhật mật khẩu
        </button>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Cập nhật hồ sơ
        </button>
      </div>
    </div>
  );
}

export default ProfileForm;
