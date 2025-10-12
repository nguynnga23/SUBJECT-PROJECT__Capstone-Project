import { useRef, useState } from "react";
import { LiaTimesCircle } from "react-icons/lia";

function ProfileForm({
  setUserProfile,
  currentUser,
  setShowUpdatePasswordForm,
}) {
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar.url);
  const fileInputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [preCurrentUser, setPreCurrentUser] = useState(currentUser || {});
  const [formData, setFormData] = useState(currentUser || {});

  const handleSave = () => {
    console.log("Dữ liệu cập nhật:", FormData);
    setEditMode(false);
    // TODO: Gọi API lưu dữ liệu ở đây
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      <LiaTimesCircle
        className="absolute top-4 right-4 text-gray-500 w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
        onClick={() => setUserProfile(false)}
      />

      <div className="flex items-center">
        <div>
          <img
            src={avatarPreview}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow"
            disabled={!editMode}
            onClick={handleClickAvatar}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            disabled={!editMode}
            onChange={handleAvatarChange}
            hidden
          />
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {currentUser ? currentUser.username : "N/A"}
          </h2>
          <i className="text-sm">
            {currentUser ? currentUser.studentID : "N/A"}
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
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700">
            Khoa
          </label>
          <input
            type="text"
            placeholder="Tên khoa"
            name="department"
            value={formData.department?.department_name || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700">
            Lớp học
          </label>
          <input
            type="text"
            placeholder="Tên lớp học"
            name="class"
            value={formData.class || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div>
          {!editMode ? (
            <div className="flex justify-end items-center">
              <button
                className="mt-4 px-4 py-2 mr-2 bg-gray-400 text-white rounded hover:bg-blue-700 transition"
                onClick={handleShowChangePassword}
              >
                Cập nhật mật khẩu
              </button>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setEditMode(true)}
              >
                Cập nhật hồ sơ
              </button>
            </div>
          ) : (
            <div className="flex justify-end items-center">
              <button
                onClick={() => {
                  setEditMode(false);
                  setFormData(preCurrentUser);
                }}
                className="mt-4 px-4 py-2 mr-2 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
