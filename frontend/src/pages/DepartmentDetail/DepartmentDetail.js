import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdAddCircle } from "react-icons/md";
import { mockDepartments } from "../../assets/sampleData";

function DepartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const department = mockDepartments.find((a) => a.id.toString() === id);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(department || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Dữ liệu cập nhật:", formData);
    setEditMode(false);
    // TODO: Gọi API lưu dữ liệu ở đây
  };

  if (!department) {
    return (
      <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center">
        Không tìm thấy thông tin Khoa/Viện này!
      </h2>
    );
  }

  return (
    <div className="flex-1">
      <main className="p-2">
        <div>
          <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center h-[40px]">
            <span
              className=" cursor-pointer hover:border-b"
              onClick={() => navigate("/admin/department")}
            >
              Danh sách Khoa/Viện
            </span>
            <MdChevronRight />
            <span className="font-medium">{department.name}</span>
          </h2>

          <div className="p-6 grid grid-cols-3 gap-6">
            {/* ====== Cột 1 + 2: Thông tin chi tiết ====== */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {/* Tên khoa */}
              <div>
                <label className="block text-blue-700 mb-1">Tên Khoa</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              {/* Mã khoa */}
              <div>
                <label className="block text-blue-700 mb-1">Mã Khoa</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              {/* Trưởng khoa */}
              <div>
                <label className="block text-blue-700 mb-1">Trưởng khoa</label>
                <input
                  type="text"
                  name="leader"
                  value={formData.leader || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-blue-700 mb-1">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-blue-700 mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-blue-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              {/* Văn phòng */}
              <div className="col-span-2">
                <label className="block text-blue-700 mb-1">Văn phòng</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
            </div>

            {/* ====== Cột 3: Danh sách loại tin tức ====== */}
            <div className="col-span-1">
              <label className="block text-blue-700 mb-1">
                Các loại thông tin bài viết
              </label>

              <ul className="space-y-2 relative">
                {(formData.categories || []).map((c) => (
                  <li
                    key={c.key}
                    className="border rounded px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                  >
                    {c.name}
                  </li>
                ))}
                {editMode && (
                  <button
                    className="absolute bottom-[-30px] right-[50%] text-green-600 hover:text-green-800"
                    title="Thêm loại tin tức mới"
                  >
                    <MdAddCircle size={24} />
                  </button>
                )}
              </ul>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex justify-end gap-4">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Chỉnh sửa
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setFormData(department); // reset
                    setEditMode(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Lưu
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DepartmentDetail;
